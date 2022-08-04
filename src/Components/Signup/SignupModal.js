import React, { useEffect, useState } from 'react';
import { Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
import TextField from '../Common/TextField';
import Button from '../Common/Button';
import { useDispatch, useSelector } from 'react-redux';
import { AccountServices } from './AccountServices';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import IntlMessageFormat from 'intl-messageformat';

const initialFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    business: ""
}
export default function SignupModal(props) {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    let { showModal, handleClose } = props;
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setValues(initialFormValues);
        setErrors({});
        setSubmitted(false);
    }, [showModal])
    const validate = (fieldValues = values) => {
        let isValid = true;
        const field = {};
        if (fieldValues.firstName?.trim().length === 0) {
            field.firstName = translations.EmptyFieldMsg;
            isValid = false;
        }
        if (fieldValues.lastName?.trim().length === 0) {
            field.lastName = translations.EmptyFieldMsg;
            isValid = false;
        }
        if (fieldValues.phone?.trim().length === 0) {
            field.phone = translations.EmptyFieldMsg;
            isValid = false;
        }
        else if (!/^[+]*[\d -]{5,16}[\d]$/.test(fieldValues.phone)) {
            field.phone = translations.ValidPhoneRequired
            isValid = false
        }
        if (fieldValues.email?.trim().length === 0 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)) {
            field.email = translations.ValidEmailRequired;
            isValid = false;
        }
        if (fieldValues.business?.trim().length === 0) {
            field.business = translations.EmptyFieldMsg;
            isValid = false;
        }
        if (fieldValues.password?.trim().length === 0) {
            field.password = translations.EmptyFieldMsg;
            isValid = false;
        }
        else if (fieldValues.password?.trim().length < 8 || !/^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[*.!@$%^&(){}[:;<>,.?~_+-=|]).{8,}$/.test(fieldValues.password)) {
            field.password = translations.PasswordValidationMsg;
            isValid = false;
        }
        if (fieldValues.confirmPassword?.trim().length === 0) {
            field.confirmPassword = translations.EmptyFieldMsg;
            isValid = false;
        }
        else if (fieldValues.confirmPassword?.trim() !== fieldValues.password?.trim()) {
            field.confirmPassword = translations.PasswordsMismatch;
            isValid = false;
        }
        setErrors({
            ...field
        });
        return isValid;
    };
    useEffect(() => {
        if (submitted) validate();
    }, [values]);
    const handleInputChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const signup = () => {
        setSubmitted(true);
        if (validate()) {
            setShowLoader(true);
            const userObj = {
                email: values.email,
                password: values.password,
                password_confirmation: values.confirmPassword,
                first_name: values.firstName,
                last_name: values.lastName,
                company: values.business,
                phone_number: values.phone,
            };
            AccountServices.signupUser(userObj).then(res => {
                setShowLoader(false);
                if (res.isAxiosError || !res.access_token) {
                    if (res?.response?.status === 403) {
                        setErrors({
                            ...errors, apiError: `${translations.DuplicateEmailErr}`
                        });
                    }
                    else {
                        setErrors({
                            ...errors,
                            apiError: translations.SomethingWentWrong
                        });
                    }
                }
                else {
                    handleClose();
                    toast.success(translations.AccountCreated, { onClose: () => navigate('/login') })
                }
            });
        }
    }
    return (
        <Modal isOpen={showModal} onClosed={handleClose} backdrop="static" keyboard={false} className="signup-modal" centered size="lg" scrollable>
            <ModalHeader toggle={handleClose}>
                {translations.CreateProfile}
            </ModalHeader>
            <ModalBody>
                <TextField name="firstName"
                    label={translations.FirstName + " *"}
                    type="text"
                    onChange={handleInputChange}
                    error={errors.firstName}
                    value={values.firstName}
                    className="text-field-2 w-50"

                />
                <TextField name="lastName"
                    label={translations.LastName + " *"}
                    type="text"
                    onChange={handleInputChange}
                    error={errors.lastName}
                    value={values.lastName}
                    className="text-field-2 w-50"
                />
                <TextField name="email"
                    label={translations.Email + " *"}
                    type="email"
                    onChange={handleInputChange}
                    error={errors.email}
                    value={values.email}
                    className="text-field-2 w-50"
                />
                <TextField name="phone"
                    label={translations.PhoneNumber + " *"}
                    type="tel"
                    onChange={handleInputChange}
                    error={errors.phone}
                    value={values.phone}
                    className="text-field-2 w-50"
                />
                <TextField name="business"
                    label={translations.Business + " *"}
                    type="text"
                    onChange={handleInputChange}
                    error={errors.business}
                    value={values.business}
                    className="text-field-2 w-100"
                />
                <TextField name="password"
                    label={translations.Password + " *"}
                    type="password"
                    onChange={handleInputChange}
                    error={errors.password}
                    value={values.password}
                    className="text-field-2 w-50"
                />
                <TextField name="confirmPassword"
                    label={translations.ConfirmPassword + " *"}
                    type="password"
                    onChange={handleInputChange}
                    error={errors.confirmPassword}
                    value={values.confirmPassword}
                    className="text-field-2 w-50"
                />
                {errors.apiError && <div className="error-msg">{errors.apiError}</div>}
            </ModalBody>
            <ModalFooter>
                <Button label={translations.SignUp} onClick={signup} showBtnLoader={showLoader} className="signup-btn" />
                <div className='fw-500 mb-3 w-100 text-end'>
                    {new IntlMessageFormat(translations.LoginMsg, userLanguageData.language).format({
                        c: chunk1 => <a key={2} onClick={() => { handleClose(); navigate("/login") }} className="signupLink"> {chunk1}</a>
                    }
                    )}
                </div>
            </ModalFooter>
        </Modal>
    );
}
