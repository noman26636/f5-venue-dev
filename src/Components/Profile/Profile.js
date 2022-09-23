import React, { useEffect, useState } from 'react';
import TextField from '../Common/TextField';
import { useDispatch, useSelector } from 'react-redux';
import * as TYPES from '../../Store/actions/types';
import Button from '../Common/Button';
import { AccountServices } from '../Signup/AccountServices';
import { Col, Row } from 'reactstrap';
import Checkbox from '../Common/Checkbox';
import Modal from '../Common/Modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const initialFormValues = {
    profileData: {
        firstname: "",
        lastname: "",
        email: "",
        phone_number: "",
        company: "",
        cvr: ""
    },
    passwordData: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    },
    preferenceData: {
        newsLetter: false,
        productNews: false
    }
}

function Profile() {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(null);
    const [showLoader, setShowLoader] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleInputChange = ({ target }, from) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        const obj = {
            ...values,
            [from]: { ...values[from], [name]: value }
        };
        setValues(obj);
    };
    useEffect(() => {
        if (submitted === "profile") validate("profile");
        else if (submitted === "password") validate("password");
    }, [values]);
    useEffect(() => {
        getProfile();
    }, [])
    const validate = (formToValidate) => {
        let isValid = true;
        const field = {};
        if (formToValidate === "profile") {
            let fieldValues = { ...values.profileData };
            if (fieldValues.firstname?.trim().length === 0) {
                field.firstname = translations.EmptyFieldMsg;
                isValid = false;
            }
            if (fieldValues.lastname?.trim().length === 0) {
                field.lastname = translations.EmptyFieldMsg;
                isValid = false;
            }
            if (fieldValues.email?.trim().length === 0 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)) {
                field.email = translations.ValidEmailRequired;
                isValid = false;
            }
            if (fieldValues.phone_number?.trim().length === 0) {
                field.phone_number = translations.EmptyFieldMsg;
                isValid = false;
            }
            else if (!/^[+]*[\d -]{5,16}[\d]$/.test(fieldValues.phone_number)) {
                field.phone_number = translations.ValidPhoneRequired
                isValid = false
            }
            if (fieldValues.company?.trim().length === 0) {
                field.company = translations.EmptyFieldMsg;
                isValid = false;
            }
        }
        else if (formToValidate === "password") {
            let fieldValues = { ...values.passwordData };
            if (fieldValues.currentPassword?.trim().length === 0) {
                field.currentPassword = translations.EmptyFieldMsg;
                isValid = false;
            }
            else if (fieldValues.newPassword?.trim().length < 8 || !/^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[*.!@$%^&(){}[:;<>,.?~_+-=|]).{8,}$/.test(fieldValues.newPassword)) {
                field.newPassword = translations.PasswordValidationMsg;
                isValid = false;
            }
            if (fieldValues.confirmPassword?.trim().length === 0) {
                field.confirmPassword = translations.EmptyFieldMsg;
                isValid = false;
            }
            else if (fieldValues.confirmPassword?.trim() !== fieldValues.newPassword?.trim()) {
                field.confirmPassword = translations.PasswordsMismatch;
                isValid = false;
            }
        }
        setErrors({
            ...field
        });
        return isValid;
    };
    const getProfile = () => {
        AccountServices.getProfile().then(res => {
            if (!res.isAxiosError && res?.user)
            setValues({ ...values, profileData: {...values.profileData, ...res.user[0],
                company:res.user[0].company?.name,cvr:res.user[0].company?.cvr} })
        });
    }
    const updateProfile = () => {
        setSubmitted("profile");
        if (validate("profile")) {
            setShowLoader("profile");
            const apiObj = {
                "email": values.profileData.email,
                "first_name": values.profileData.firstname,
                "last_name": values.profileData.lastname,
                "company": values.profileData.company,
                "cvr": values.profileData.cvr,
                "phone_number": values.profileData.phone_number
            }
            AccountServices.editProfile(apiObj).then(res => {
                setShowLoader(null);
                if (!res.isAxiosError) {
                    setSubmitted(null);
                    toast.success(translations.Success);
                }
            });
        }
    }
    const changePassword = () => {
        setSubmitted("password");
        if (validate("password")) {
            setShowLoader("password");
            const apiObj = {
                "current_password": values.passwordData.currentPassword,
                "password": values.passwordData.newPassword,
                "password_confirmation": values.passwordData.confirmPassword
            }
            AccountServices.changePassword(apiObj).then(res => {
                setShowLoader(null);
                if (!res.isAxiosError) {
                    setSubmitted(null);
                    setValues({...values,passwordData:initialFormValues.passwordData});
                    toast.success(translations.Success);
                }
                else
                {
                    setErrors({
                        ...errors,passwordError:res?.response?.data?.message
                    });
                }
            });
        }
    }
    const deleteAccount = () => {
        setShowLoader("delete");
        AccountServices.deleteAccount().then(res => {
            setShowLoader(null);
            if (!res.isAxiosError) {
                toast.info(translations.AccountDeleted);
                dispatch({ type: TYPES.LOGOUT });
                navigate("/home");
            }
        });
    }
    return (
        <>
            <div className='profile-edit'>
                <div className="form-wrap" >
                    <div className='title'>
                        {translations.EditContactInfomation}
                    </div>
                    <Row className='form'>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="firstname"
                                label={translations.FirstName + " *"}
                                type="text"
                                onChange={(e) => { handleInputChange(e, "profileData") }}
                                error={errors.firstnme}
                                value={values.profileData?.firstname}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="lastname"
                                label={translations.LastName + " *"}
                                type="text"
                                onChange={(e) => { handleInputChange(e, "profileData") }}
                                error={errors.lastname}
                                value={values.profileData?.lastname}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="email"
                                label={translations.Email + " *"}
                                type="email"
                                onChange={(e) => { handleInputChange(e, "profileData") }}
                                error={errors.email}
                                value={values.profileData?.email}
                                className="text-field-2"
                            /></Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="phone_number"
                                label={translations.PhoneNumber + " *"}
                                type="tel"
                                onChange={(e) => { handleInputChange(e, "profileData") }}
                                error={errors.phone_number}
                                value={values.profileData?.phone_number}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="company"
                                label={translations.Company + " *"}
                                type="text"
                                onChange={(e) => { handleInputChange(e, "profileData") }}
                                error={errors.company}
                                value={values.profileData?.company}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="cvr"
                                label={translations.VatIdCvr}
                                type="number"
                                onChange={(e) => { handleInputChange(e, "profileData") }}
                                error={errors.cvr}
                                value={values.profileData?.cvr}
                                className="text-field-2"
                            />
                        </Col>
                        <Button label={translations.Update} onClick={updateProfile} className="d-block ml-auto" wrapperClass="w-100"
                            showBtnLoader={showLoader === "profile"} />
                    </Row>
                </div>
                <div className='form-wrap password-form'>
                    <div className='title-block'>
                        <div className='title'>
                            {translations.ChangePassword}
                        </div>
                        <div className='delete-block'>
                            <Button label={translations.DeleteAccount} onClick={() => { setShowModal(true) }} className="form-btn delete-btn"
                                showBtnLoader={showLoader === "delete"} />
                            <span className='helping-text'>
                                {translations.ActionCannotBeUndone}
                            </span>
                        </div>
                    </div>
                    <Row className='form'>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="currentPassword"
                                label={translations.CurrentPassword + " *"}
                                type="password"
                                onChange={(e) => { handleInputChange(e, "passwordData") }}
                                error={errors.passwordError?errors.passwordError: errors.currentPassword}
                                value={values.passwordData.currentPassword}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="newPassword"
                                label={translations.NewPassword + " *"}
                                type="password"
                                onChange={(e) => { handleInputChange(e, "passwordData") }}
                                error={errors.newPassword}
                                value={values.passwordData.newPassword}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="confirmPassword"
                                label={translations.ConfirmNewPassword + " *"}
                                type="password"
                                onChange={(e) => { handleInputChange(e, "passwordData") }}
                                error={errors.confirmPassword}
                                value={values.passwordData.confirmPassword}
                                className="text-field-2"
                            />
                        </Col>
                        <Button label={translations.ChangePassword} onClick={changePassword} wrapperClass="ml-auto"
                            showBtnLoader={showLoader === "password"} />
                    </Row>
                </div>
                {/* <div className='form-wrap preferences-form'>
                    <div className='title'>
                        {translations.CommunicationPreferences}
                    </div>
                    <Row className='form '>
                        <Col xl={4} lg={4} md={6}>
                            <Checkbox className="pink-checkbox" label={translations.Newsletter} onChange={(e) => { handleInputChange(e, "preferenceData") }} value={values.preferenceData.newsLetter}
                                name="newsLetter" />
                            <div className='checkbox-desc'>{translations.NewsletterDesc}</div>
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <Checkbox className="pink-checkbox" label={translations.ProductNews} onChange={(e) => { handleInputChange(e, "preferenceData") }} value={values.preferenceData.productNews} name="productNews" />
                            <div className='checkbox-desc'>{translations.ProductNewsDesc}</div>
                        </Col>
                    </Row>
                </div> */}
            </div >
            <Modal text={translations.DeleteConfirmation} showModal={showModal} handleClose={() => setShowModal(false)} btn1Text={translations.Yes}
                btn1Click={deleteAccount} btn2Text={translations.No} />
        </>
    );
}

export default Profile;