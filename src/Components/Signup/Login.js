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
import Checkbox from '../Common/Checkbox';
import Button from '../Common/Button';
import { useNavigate } from 'react-router-dom';
const initialFormValues = {
    email: "user1@mail.com",
    password: "PassWord12345",
    rememberMe: false
}
export default function Login(props) {
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
        if (fieldValues.email.trim().length === 0 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)) {
            field.email = translations.ValidEmailRequired;
            isValid = false;
        }
        if (fieldValues.password.trim().length === 0) {
            field.password = translations.EmptyFieldMsg;
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
            AccountSevices.login(values).then(res => {
                setShowLoader(false);
                if (res.isAxiosError || !res.access_token) {
                    // if (res.response.status === 403) {
                    //     setErrors({
                    //         ...errors, password: `${translations.email_not_verified}`
                    //     });
                    // }
                    // else
                    if (res.response.status === 401) {
                        setErrors({
                            ...errors, password: translations.InvalidLogin
                        });
                    }
                    else {
                        setErrors({
                            ...errors,
                            password: translations.SomethingWentWrong
                        });
                    }
                }
                else {
                    dispatch({ type: TYPES.LOGIN, data: { ...res } });
                    navigate(`/home`);
                }
            });
        }
    }

    return (
        <div className='login-container'>
            <Row>
                <Col lg={6} md={6} className="medium-hidden img-wrapper" ><img src={loginImg} alt="Events venue" /></Col>
                <Col lg={6} md={6} sm={12} className="form-wrapper">
                    <div className='logo-block'>
                        <img src={logo} alt="Events venue" />
                    </div>
                    <div className="intro-block">
                        <h1 >
                            {translations.Login}
                        </h1>
                    </div>

                    <form className="signup-form" >
                        <TextField name="email"
                            label={translations.Email}
                            type="email"
                            onChange={handleInputChange}
                            icon={userImg}
                            error={errors.email}
                            value={values.email}
                            onKeyUp={enableLoginonEnter}
                        />

                        <TextField name="password"
                            label={translations.Password}
                            type="password"
                            onChange={handleInputChange}
                            icon={lock}
                            error={errors.password}
                            value={values.password}
                            onKeyUp={enableLoginonEnter}
                        />
                        <div className='d-flex'>
                            <Checkbox label={translations.RememberMe} onChange={handleInputChange} value={values.rememberMe} name="rememberMe" />
                            <div className='ml-auto cursor-pointer' onClick={() => { navigate("/forgotPassword") }}>{translations.ForgotPassword}</div>
                        </div>
                        <Button label={translations.Login} onClick={handleClick} showBtnLoader={showLoader}></Button>
                        <div className='fw-500 mb-3'>
                            {new IntlMessageFormat(translations.RegisterMsg, userLanguageData.language).format({
                                s: chunk1 => <span className="fw-600" key={1}> {chunk1}</span>,
                                c: chunk2 => <a key={2} onClick={() => { navigate("/signup") }} className="signupLink"> {chunk2}</a>
                            }
                            )}
                        </div>
                    </form>
                </Col >
            </Row>
        </div >
    )
}
