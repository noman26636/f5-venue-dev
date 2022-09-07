import React, { useEffect, useState } from 'react';
import TextField from '../Common/TextField';
import { useSelector } from 'react-redux';
import Button from '../Common/Button';
import { AccountServices } from '../Signup/AccountServices';
import { Col, Row } from 'reactstrap';
import Modal from '../Common/Modal';
import { toast } from 'react-toastify';
import { Table } from "reactstrap";
import InviteUser from './InviteUser';
import deleteIcon from "../../Assets/icons/deletebin.svg";
const initialFormValues = {
        name: "",
        cvr: "",
        users: [],
        billing:{email: "", address: "", zipcode: "", reference: "", billing_email: "", invoice_detail: ""},
    invitationEmail: ""
}
const Company = () => {
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
    const [showInviteUserModal, setShowInviteUserModal] = useState(false);
    const handleInputChange = ({ target }, from = null) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        if (!from) {
            setValues({
                ...values,
                [name]: value,
            });
        }
        else {
            const obj = {
                ...values,
                [from]: { ...values[from], [name]: value }
            };
            setValues(obj);
        }
    };
    useEffect(() => {
        if (submitted === "company") validate("company");
        else if (submitted === "billing") validate("billing");
    }, [values]);
    useEffect(() => {
       getBilling();
    }, []);
    const validate = (formToValidate) => {
        let isValid = true;
        const field = {};
        if (formToValidate === "billing") {
            let fieldValues = { ...values.billing };
            if (fieldValues.email?.trim().length === 0 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)) {
                field.email = translations.ValidEmailRequired;
                isValid = false;
            }
            if (fieldValues.address?.trim().length === 0) {
                field.address = translations.EmptyFieldMsg;
                isValid = false;
            }
            if (fieldValues.zipcode?.trim().length === 0) {
                field.zipcode = translations.EmptyFieldMsg;
                isValid = false;
            }
        }
        else if (formToValidate === "company") {
            let fieldValues = { ...values };
            if (fieldValues.name?.trim().length === 0) {
                field.name = translations.EmptyFieldMsg;
                isValid = false;
            }
        }
        setErrors({
            ...field
        });
        return isValid;
    };
    const getCompany = () => {
        AccountServices.getCompany().then(res => {
            if (!res.isAxiosError) {
                setValues({ ...values,...res[0]});
                const a={ ...values,...res[0]};
            }
        });
    }
    const inviteUser = () => {
        setShowLoader("invite");
        AccountServices.inviteUser(values.invitationEmail).then(res => {
            setShowLoader(null);
            setShowInviteUserModal(false);
            if (!res.isAxiosError)
                toast.success(translations.InvitationSent);
        });
    }
    const getBilling = () => {
        AccountServices.getBilling().then(res => {
            if (!res.isAxiosError) {
                setValues({ ...values,...res[0],billing:res[0]?.billing?res[0]?.billing:{...values.billing}});
                const a={ ...values,...res[0]};
            }
        });
    }
    // const updateCompany = () => {
    //     setSubmitted("company");
    //     if (validate("company")) {
    //         setShowLoader("company");
    //         const apiObj = {
    //             name: values.name,
    //             cvr: values.cvr
    //         }
    //         AccountServices.updateCompany(apiObj).then(res => {
    //             setSubmitted(null);
    //             setShowLoader(null);
    //             if (!res.isAxiosError) {
    //                 toast.success(translations.Success);
    //                 setValues({ ...initialFormValues });
    //             }
    //         });
    //     }
    // }
    const updateBilling = () => {
        setSubmitted("billing");
        if (validate("billing")) {
            setShowLoader("billing");
            const apiObj = {
                ...values.billing
            }
            AccountServices.updateBilling(apiObj).then(res => {
                setSubmitted(null);
                setShowLoader(null);
                if (!res.isAxiosError) {
                    toast.success(translations.Success);
                    getBilling();
                }
            });
        }
    }
    const deleteUserFromCompany = (id) => {
        AccountServices.deleteUserFromCompany(id).then(res => {
            if (!res.isAxiosError) {
                toast.info(translations.UserDeleted);
                getCompany();
            }
        });
    }
    return (
        <>
            <div className='profile-edit'>
                <div className='form-wrap company-form'>
                    <div className='title'>
                        {translations.EditCompanyInfomation}
                    </div>
                    <Row className='form'>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="name"
                                label={translations.Name + " *"}
                                type="text" disabled
                                onChange={(e) => { handleInputChange(e) }}
                                error={errors.name}
                                value={values.name}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="cvr" disabled
                                label={translations.VatIdCvr}
                                type="number"
                                onChange={(e) => { handleInputChange(e) }}
                                error={errors.cvr}
                                value={values.cvr}
                                className="text-field-2"
                            />
                        </Col>
                        {/* <Button label={translations.Update} onClick={updateCompany} className="small-btn ml-auto" wrapperClass="w-100"
                            showBtnLoader={showLoader === "company"} /> */}
                    </Row>
                </div>
                <div className='users-table'>
                    <div className='title-block'>
                        <div className='title'>
                            {translations.Users}
                        </div>
                        <Button label={translations.InviteNewUser} onClick={() => { setValues({ ...values, invitationEmail: "" }); setShowInviteUserModal(true) }} className="small-btn ml-auto"
                        />
                    </div>
                    <Table borderless responsive>
                        <thead>
                            <tr className="table-light">
                                <th>{translations.Name}</th>
                                <th>{translations.Email}</th>
                                <th>{translations.Phone}</th>
                                <th>{translations.Status}</th>
                                <th>{translations.Action}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                values.users?.length > 0 ?
                                    values.users?.map((item, i) => {
                                        return <tr key={i}>
                                            <td>{`${item.firstname} ${item.lastname}`}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone_number}</td>
                                            <td>{}</td>
                                            <td><img alt="" src={deleteIcon} className="bin-icon ml-3 cursor-pointer" onClick={() => { deleteUserFromCompany(item.id) }} /></td>
                                        </tr>
                                    })
                                    :
                                    <tr>
                                        <td colSpan={7}>
                                            <div className='text-block fw-600 text-center my-5'>
                                                {translations.NoDataToShow}
                                            </div>
                                        </td>
                                    </tr>
                            }
                        </tbody>
                    </Table>
                </div>
                <div className="form-wrap" >
                    <div className='title'>
                        {translations.BillingInformation}
                    </div>
                    <Row className='form'>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="email"
                                label={translations.Email + " *"}
                                type="email"
                                onChange={(e) => { handleInputChange(e, "billing") }}
                                error={errors.email}
                                value={values.billing?.email}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="address"
                                label={translations.Address + " *"}
                                type="text"
                                onChange={(e) => { handleInputChange(e, "billing") }}
                                error={errors.address}
                                value={values.billing?.address}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="zipcode"
                                label={translations.Zipcode + " *"}
                                type="number"
                                onChange={(e) => { handleInputChange(e, "billing") }}
                                error={errors.zipcode}
                                value={values.billing?.zipcode}
                                className="text-field-2"
                            /></Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="reference"
                                label={`${translations.OrderReference} (${translations.Optional})`}
                                type="text"
                                onChange={(e) => { handleInputChange(e, "billing") }}
                                error={errors.reference}
                                value={values.billing?.reference}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="billing_email"
                                label={`${translations.BillingContactPersonEmail} (${translations.Optional})`}
                                type="text"
                                onChange={(e) => { handleInputChange(e, "billing") }}
                                error={errors.billing_email}
                                value={values.billing?.billing_email}
                                className="text-field-2"
                            />
                        </Col>
                        <Col xl={4} lg={4} md={6}>
                            <TextField name="invoice_detail"
                                label={`${translations.BillingDetails} (${translations.Optional})`}
                                type="text"
                                onChange={(e) => { handleInputChange(e, "billing") }}
                                error={errors.invoice_detail}
                                value={values.billing?.invoice_detail}
                                className="text-field-2"
                            />
                        </Col>
                        <Button label={translations.Update} onClick={updateBilling} className="small-btn ml-auto" wrapperClass="w-100"
                            showBtnLoader={showLoader === "billing"} />
                    </Row>
                </div>
            </div >
            <Modal text={translations.DeleteConfirmation} showModal={showModal} handleClose={() => setShowModal(false)} btn1Text={translations.Yes}
                btn1Click={deleteUserFromCompany} btn2Text={translations.No} />
            <InviteUser showModal={showInviteUserModal} handleClose={() => setShowInviteUserModal(false)} email={values.invitationEmail}
                inviteUser={inviteUser} handleInputChange={handleInputChange}
            />
        </>
    );
};

export default Company;