import React, { useEffect, useState } from 'react';
import { AccountSevices } from './AccountSevices';
import { Constants } from '../../Configurations/Constants';
import { useNavigate } from 'react-router-dom';
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
import Modal from '../Common/Modal';
const initialFormValues = {
    email: "",
}
export default function ForgotPassword(props) {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const navigate = useNavigate();
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

        setErrors({
            ...field
        });
        return isValid;
    };
    const handleClick = () => {
        setSubmitted(true);
        if (validate()) {
            setShowLoader(true);
            AccountSevices.forgotPassword(values).then(res => {
                setShowLoader(false);
                // if (res.isAxiosError) {

                //     // if (res.response.status === 401) {
                //     setErrors({
                //         ...errors, email: translations.InvalidLogin
                //     });
                //     // }

                // }
                // else {
                setShowModal(true);
                // }
            });
        }
    }
    const handleModalClose = () => {
        setShowModal(false);
        navigate("/home");
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
                                {translations.ForgotPassword}
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
                            {/* <div className='ml-auto cursor-pointer' onClick={() => { navigate("/login") }}>{translations.Back}</div> */}
                            <Button label={translations.Proceed} onClick={handleClick} showBtnLoader={showLoader}></Button>
                        </form>
                    </Col >
                </Row>
            </div >
            <Modal text={translations.EmailSent} showModal={showModal} handleClose={handleModalClose} btn1Text={translations.Ok}
                btn1Click={handleModalClose} />

        </>
    )
}
