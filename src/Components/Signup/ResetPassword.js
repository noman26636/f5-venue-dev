import React, { useEffect, useState } from 'react';
import { AccountSevices } from './AccountSevices';
import { Constants } from '../../Configurations/Constants';
import IntlMessageFormat from 'intl-messageformat';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Col } from 'reactstrap';
import * as TYPES from '../../Store/actions/types';
import TextField from '../Common/TextField';
import userImg from "../../Assets/icons/user.svg";
import lock from "../../Assets/icons/lock.svg";
import loginImg from "../../Assets/images/login-img.jpg";
import logo from "../../Assets/images/main-logo.svg";
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';
import Modal from '../Common/Modal';
const initialFormValues = {
    password: "PassWord12345",
    confirmPassword: "",

}
export default function ResetPassword() {
    const appState = useSelector((state) => {
        return state.app;
    });
    const authState = useSelector((state) => {
        return state.auth;
    });
    const navigate = useNavigate();
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [showLoader, setShowLoader] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const enableLoginonEnter = (e) => {
        if (e.key === "Enter") {
            handleClick();
        }
    }
    useEffect(() => {
        if (submitted) validate();
    }, [values]);
    // useEffect(() => {
    //     if (authState?.user?.access_token)
    //         navigate("/home");
    // })
    const handleInputChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const validate = (fieldValues = values) => {
        let isValid = true;
        const field = {};
        if (fieldValues.password.trim().length === 0) {
            field.password = translations.EmptyFieldMsg;
            isValid = false;
        }
        else if (fieldValues.password.trim().length < 8 || !/^(?=.*[0-9])(?=.*[A-Za-z])(?=.*[*.!@$%^&(){}[:;<>,.?~_+-=|]).{8,}$/.test(fieldValues.password)) {

            field.password = translations.PasswordValidationMsg;
            isValid = false;
        }
        if (fieldValues.confirmPassword.trim().length === 0) {
            field.confirmPassword = translations.EmptyFieldMsg;
            isValid = false;
        }
        else if (fieldValues.confirmPassword.trim() !== fieldValues.password.trim()) {
            field.confirmPassword = translations.PasswordsMismatch;
            isValid = false;
        }
        setErrors({
            ...field
        });
        return isValid;
    };
    const handleClick = () => {
        setSubmitted(true);
        if (validate()) {
            setShowLoader(true);
            // values.token = props.params.match.code;
            // values.email = props.params.match.code;
            AccountSevices.resetPassword(values).then(res => {
                setShowLoader(false);
                if (res.isAxiosError) {
                    setErrors({
                        ...errors,
                        confirmPassword: translations.SomethingWentWrong
                    });
                }
                else {
                    setShowModal(true);
                }
            });
        }
    }
    const handleModalClose = () => {
        setShowModal(false);
        navigate("/login");
    }
    return (
        <>
            <div className='login-container'>
                <Row>
                    <Col lg={6} md={6} className="medium-hidden img-wrapper" ><img src={loginImg} alt="Events venue" /></Col>
                    <Col lg={6} md={6} sm={12} className="form-wrapper">
                        <div className='logo-block'>
                            <img src={logo} alt="Events venue" />
                        </div>
                        <div className="intro-block">
                            <h1 >
                                {translations.ResetPassword}
                            </h1>
                        </div>

                        <form className="signup-form" >
                            <TextField name="password"
                                label={translations.Password}
                                type="password"
                                onChange={handleInputChange}
                                icon={lock}
                                error={errors.password}
                                value={values.password}
                                onKeyUp={enableLoginonEnter}
                            />
                            <TextField name="confirmPassword"
                                label={translations.ConfirmPassword}
                                type="password"
                                onChange={handleInputChange}
                                icon={lock}
                                error={errors.confirmPassword}
                                value={values.confirmPassword}
                                onKeyUp={enableLoginonEnter}
                            />
                            <Button label={translations.Proceed} onClick={handleClick} showBtnLoader={showLoader}></Button>
                        </form>
                    </Col >
                </Row>
            </div >
            <Modal text={translations.PasswordResetSuccess} showModal={showModal} handleClose={handleModalClose} btn1Text={translations.Ok}
                btn1Click={handleModalClose} />
        </>
    )
}
