import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Button from '../Common/Button';
import FormDropdown from '../Common/Dropdown';
import TextField from '../Common/TextField';
export default function WishlistModal(props) {
    const {wishlist,showModal,handleClose,wishlistVenue,addToWishlist,showBtnLoader,isLoggedIn,getWishlistIds}=props;
    let wishlistIds =getWishlistIds();
    // if(wishlistIds.length<1) wishlistIds=[0];
    const [values, setValues] = useState({ list: 0, title: "" });
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [error, setError] = useState(null);
    const getWishlistOptions = () => {
        //TODO
        //map wislist obj to id and name
        return [{ id: 0, name: translations.CreateWishlist }, ...wishlist];
    }
    useEffect(() => {
        setValues({ list: 0, title: "" });
        setError(null);
    }, [showModal])
    const add = () => {
        const alreadyAdded = wish   ();
        if (values.title !== "") {
            addToWishlist(values.title, wishlistVenue.id, null);
        }
//  else if (Number(values.list) !== 0 && alreadyAdded()) {
        else if (Number(values.list) !== 0 && wishlistIds.indexOf(Number(values.list))===-1 ) {
            addToWishlist(null, wishlistVenue.id, Number(values.list));
        }
        else if (wishlistIds.indexOf(Number(values.list)!==-1)) {

            setError(translations.VenueAlreadyInList);
        }
        else if (Number(values.list) !== 0 && !alreadyAdded) {
            addToWishlist(null, wishlistVenue.id, Number(values.list));
        }
        else { handleClose(); }
    }
    return (
        <Modal isOpen={showModal} onClosed={handleClose} backdrop="static" keyboard={false} className="wishlist-modal" centered>
            {
                <ModalHeader toggle={handleClose}>
                {translations.AddToWishlist}
                <div style={{fontSize:'14px'}}>{wishlistVenue.name}</div>
            </ModalHeader>
            }
            <ModalBody>
                {(wishlist?.length > 0) &&
                    <>
                        <div className='mb-2'>{translations.SelectWishlist}</div>
                        < FormDropdown options={getWishlistOptions()} name="list" value={values.list}
                            onChange={({ target }) => { setError(null); setValues({ list: target.value, title: "" }) }}
                            error={error}
                        />
                    </>
                }
                {Number(values.list) === 0 &&
                    <TextField name="title"
                        label={`${translations.NameOfList} *`}
                        type="text"
                        onChange={({ target }) => { setValues({ title: target.value, list: 0 }) }}
                        value={values.title}
                        className="text-field-2"
                    />
                }
                <Button label={translations.AddToWishlist} onClick={add} className={`small-btn ml-auto mt-4`} wrapperClass="w-100"
                    showBtnLoader={showBtnLoader} disabled={(values.title === "" && (Number(values.list) === 0)) ||
                        (values.title === "" && wishlist?.length === 0)}
                />
            </ModalBody>
        </Modal>
    );
}