import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Button from '../Common/Button';
import FormDropdown from '../Common/Dropdown';
import TextField from '../Common/TextField';
export default function WishlistModal(props) {
    const {allWishlists,showModal,handleClose,wishlistVenue,addToWishlist,showBtnLoader,isLoggedIn,getWishlistIds}=props;
    let wishlistIds =getWishlistIds();
    const [values, setValues] = useState({ selectedList:wishlistIds.length>0?wishlistIds[0]: -1, title: "" });
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [error, setError] = useState(null);
    const getWishlistOptions = () => {
        const a=[{ id: -1, name: translations.CreateWishlist }, ...allWishlists];
        return [{ id: -1, name: translations.CreateWishlist }, ...allWishlists];
    }
    useEffect(() => {
        setValues({ selectedList:wishlistIds.length>0?wishlistIds[0]: -1, title: "" });
        setError(null);
    }, [showModal])
    useEffect(() => {
        if(wishlistIds?.indexOf(Number(values.selectedList))!=-1) setError(translations.VenueAlreadyInList);
        else setError(null);
    }, [values.selectedList,showModal])
    const add=()=>{
        //creating new wl and adding venue to it
        if(values.selectedList==-1 && values.title!=="" && !error)
        addToWishlist(values.title, wishlistVenue.id, null);
        //adding venue to already created wl
        else if(!error)
        addToWishlist(values.title, wishlistVenue.id, Number(values.selectedList));
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
                {(allWishlists?.length > 0) &&
                    <>
                        <div className='mb-2'>{translations.SelectWishlist}</div>
                        < FormDropdown options={getWishlistOptions()} name="selectedList" value={values.selectedList}
                            onChange={({ target }) => { setError(null); setValues({ selectedList: target.value, title: "" }) }}
                            error={error}
                        />
                    </>
                }
                {values.selectedList == -1 &&
                    <TextField name="title"
                        label={`${translations.NameOfList} *`}
                        type="text"
                        onChange={({ target }) => { setValues({...values, title: target.value,  }) }}
                        value={values.title}
                        className="text-field-2"
                    />
                }
                <Button label={translations.AddToWishlist} onClick={add} className={`small-btn ml-auto mt-4`} wrapperClass="w-100"
                    showBtnLoader={showBtnLoader} 
                    disabled={(values.title === "" && (values.selectedList) == -1) || (values.selectedList != -1 && wishlistIds.indexOf(values.selectedList)!=-1)}
                />
            </ModalBody>
        </Modal>
    );
}