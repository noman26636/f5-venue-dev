import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Button from '../Common/Button';
import TextArea from '../Common/TextArea';
import TextField from '../Common/TextField';
export default function AddWishlistModal(props) {
    let { wishlistId, showModal, handleClose, addWishlist, showBtnLoader } = props;
    const [values, setValues] = useState({ name: "", description: "" });
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    useEffect(() => {
<<<<<<< HEAD
        setValues({ name: "", description: "" });
=======
        setValues({ name: "g-wl", description: "abc" });
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
    }, [showModal])
    const handleInputChange = ({ target }) => {
        const value = target.value;
        const { name } = target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    return (
        <Modal isOpen={showModal} onClosed={handleClose} backdrop="static" keyboard={false} className="wishlist-modal" centered>
            {<ModalHeader toggle={handleClose}>
                {wishlistId ? translations.EditWishlist : translations.CreateWishlist}
            </ModalHeader>}
            <ModalBody>
                <TextField name="name"
                    label={translations.Name}
                    type="text"
                    onChange={handleInputChange}
                    value={values.name}
                    className="text-field-2"
                />
                <TextArea name="description"
                    label={translations.Description}
                    onChange={handleInputChange}
                    value={values.description}
                    className="text-field-2"
                    rows={4}
                />
                <Button label={translations.Create} onClick={() => addWishlist(values)} className={`small-btn ml-auto mt-4`} wrapperClass="w-100"
                    showBtnLoader={showBtnLoader} disabled={values.name === ""} />
            </ModalBody>
        </Modal>
    );
}