import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button';
import Pageloader from '../Common/Pageloader';
import { toast } from 'react-toastify';
import { VenueServices } from '../Venue/VenueServices';
import AddWishlistModal from './AddWishlistModal';
import deleteIcon from "../../Assets/icons/deletebin.svg";
import Modal from '../Common/Modal';

const dummyList = [
    {
        created_at: "2022-07-25T12:41:36.000000Z",
        description: "abc",
        id: 6,
        name: "abc",
        privacy: "Public",
        updated_at: "2022-07-25T12:41:36.000000Z",
        user_id: 1,
        venues: [{
            city: "Islamabad",
            id: 2,
            long_description: "This is a long description",
            name: "Al Fatah",
            price_per_person: "12.000",
            rent_per_day: "12.000",
            rent_per_hour: "12.000",
            reservation_deposit: "12.000",
            seating_capacity: 12,
            short_description: "This is a short description",
            standing_capacity: 12,
            status: "Pending",
            street_address: "Al Fatah",
            updated_at: "2022-07-21T10:49:43.000000Z",
            user_id: 1,
            zip_code: 1432,
        }]
    },
    {
        created_at: "2022-07-25T12:41:36.000000Z",
        description: "abc",
        id: 6,
        name: "abc",
        privacy: "Public",
        updated_at: "2022-07-25T12:41:36.000000Z",
        user_id: 1,
        venues: [{
            city: "Islamabad",
            id: 2,
            long_description: "This is a long description",
            name: "Al Fatah",
            price_per_person: "12.000",
            rent_per_day: "12.000",
            rent_per_hour: "12.000",
            reservation_deposit: "12.000",
            seating_capacity: 12,
            short_description: "This is a short description",
            standing_capacity: 12,
            status: "Pending",
            street_address: "Al Fatah",
            updated_at: "2022-07-21T10:49:43.000000Z",
            user_id: 1,
            zip_code: 1432,
        }]
    },
]
const Wishlists = () => {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [showLoader, setShowLoader] = useState(true);
    const [showModal, setShowModal] = useState(null);
    const [wishlists, setWishlists] = useState(dummyList);
    const [showBtnLoader, setShowBtnLoader] = useState(null);
    const [itemToDelete, setItemToDelete] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        getAllWishlists();
    }, [])
    const getAllWishlists = () => {
        VenueServices.showWishlist().then(res => {
            if (!res.isAxiosError) {
                setWishlists(res.wishlist);
                setShowLoader(false);
            }
        });
    }
    const addWishlist = (data) => {
        setShowBtnLoader("add");
        VenueServices.addWishlist(data).then(res => {
            setShowBtnLoader(null);
            if (!res.isAxiosError) {
                toast.success(translations.WishlistCreated);
                getAllWishlists();
                setShowModal(null);
            }
        });
    }
    const deleteWishlist = () => {
        setShowBtnLoader("delete");
        VenueServices.deleteWishlist(itemToDelete).then(res => {
            setShowBtnLoader(null);
            setShowModal(null);
            if (!res.isAxiosError) {
                toast.info(translations.WishlistDeleted);
                getAllWishlists();
            }
        });
    }
    return (
        <>
            <div className='venue-manage-view wishlist-view-wrap' >
                <div className='heading-block'>
                    <div>{translations.Wishlists}</div>
                    <Button label={translations.CreateWishlist} onClick={() => setShowModal("add")} className={`small-btn add-venue-btn`} />
                </div>
                <div>
                    {translations.WishlistsDesc}
                </div>
                {
                    showLoader ? <Pageloader /> :
                        <div className='venue-manage-list wishlist-view'>
                            {
                                wishlists?.map((item, i) =>
                                    <div className='venue-item' key={i} onClick={(e) => { e.stopPropagation(); navigate(`/wishlist/${item.id}`) }}>
                                        <div className='top-block'>
                                            <div className='left-item'>
                                                <span className='venue-name'>{item.name}</span>
                                            </div>
                                            <div className='right-item'>
                                                <img alt="" src={deleteIcon} className="delete-icon"
                                                    onClick={(e) => { e.stopPropagation(); setItemToDelete(item.id); setShowModal("delete"); }}
                                                />
                                            </div>
                                        </div>
                                        <div className='bottom-block'>
                                            <span><span className='fw-600'>{item.venues?.length}</span> {item.venues?.length > 1 ? translations.Venues : translations.Venue} </span>
                                            |  <span> {translations.Created} :<span className='fw-600'> {new Date(item.created_at).toDateString()} </span></span>
                                            |   <span> {translations.Updated} :<span className='fw-600'> {new Date(item.updated_at).toDateString()} </span></span>
                                            <p>{item.description}</p>
                                        </div>
                                    </div>
                                )}
                        </div>
                }
            </div>
            <AddWishlistModal wishlist={wishlists} showModal={showModal === "add"} handleClose={() => setShowModal(null)}
                addWishlist={addWishlist} showBtnLoader={showBtnLoader === "add"} />
            <Modal text={translations.WishlistDeleteConfirm} showModal={showModal === "delete"}
                handleClose={() => { setShowModal(null); setItemToDelete(null); }} btn1Text={translations.Yes}
                btn1Click={deleteWishlist} btn2Text={translations.No} showBtnLoader={showBtnLoader === "delete"} />
        </>
    );
};

export default Wishlists;