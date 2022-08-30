import React, { useEffect, useState } from 'react';
import venueDummyImg from "../../Assets/images/venue-dummy-img.png";
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../Common/Button';
import Pageloader from '../Common/Pageloader';
import { Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { VenueServices } from '../Venue/VenueServices';
import deleteIcon from "../../Assets/icons/deletebin.svg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import yellowStar from "../../Assets/icons/yellow-star.svg";
import { faMale, faChair } from "@fortawesome/free-solid-svg-icons";
import MultiselectDD from '../Common/MultiselectDD';
import Modal from '../Common/Modal';
const WishlistDetails = () => {
    const params = useParams();
    const wishlistId = params?.wishlistId;
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [showLoader, setShowLoader] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [allVenues, setAllVenues] = useState([]);
    const [selectedVenue, setSelectedVenue] = useState(null);
    const [wishlist, setWishlist] = useState({});
    const [showBtnLoader, setShowBtnLoader] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    const navigate = useNavigate();
    useEffect(() => {
        getWishlistVenues();
        getAllVenues();
    }, [])
    const getAllVenues = () => {
        VenueServices.getallVenues().then(res => {
            const allVenueNames = res.venues?.map(item => ({
                value: item.id,
                label: item.name
            }))
            setAllVenues(allVenueNames);
        });
    }
    const getWishlistVenues = () => {
        //TODO: ask BE dev to give api for retruning venues of a wishlist based on Wlid
        VenueServices.showWishlist(wishlistId).then(res => {
            if (!res.isAxiosError) {
                const index = res.wishlist.map(i => i.id).indexOf(Number(wishlistId));
                setWishlist(res.wishlist[index]);
                setShowLoader(false);
            }
        });
    }
    const addVenueToWishlist = () => {
        setShowBtnLoader(true);
        VenueServices.addWishlist({
            "venue_id": selectedVenue,
            "wishlist_id": wishlistId
        }).then(res => {

            setShowBtnLoader(false);
            if (!res.isAxiosError) {
                setSelectedVenue(null);
                toast.success(translations.VenueAddedToWishlist);

            }
        });
    }
    const deleteVenueFromWishlist = () => {
        VenueServices.deleteWishlistVenue(wishlistId, itemToDelete).then(res => {
            if (!res.isAxiosError) {
                toast.info(translations.WishlistVenueDeleted);
                getWishlistVenues();
            }
        });
    }
    const shareWishlist = () => {
        navigator.clipboard.writeText(window.location.href);
        toast.success(translations.ShareLink, { autoClose: 5000 });
    }
    return (
        <>
            {
                showLoader ? <Pageloader /> :
                    <>
                        <div className='wishlist-details-view' >
                            <div className='heading-block'>
                                <div className='left-block'>
                                    <div className='d-flex align-items-center mb-3 justify-content-between'>
                                        <div className='name'>{wishlist.name}</div>
                                        <Button label={translations.Share} onClick={shareWishlist}
                                            className="small-btn" />
                                    </div>
                                    <div className='info-block'>
                                        <span className='info'>{wishlist.venues.length} {wishlist.venues.length === 1 ? translations.Venue : translations.Venues}        </span>
                                        <span className='mx-2'>|</span>
                                        <div className='info'> {translations.Created}:
                                            <span className='fw-600 mx-1'> {new Date(wishlist.created_at).toDateString()} </span>
                                        </div>

                                        {/* <span className='mx-2'>|</span>
                                        <div className='info'>{translations.Updated}:   {new Date(wishlist.updated_at).toDateString()} </div> */}

                                    </div>
                                </div>
                                <div className='right-block'>
                                    <MultiselectDD isMulti={false} options={allVenues} name="selectedVenue" value={selectedVenue}
                                        onChange={(data) => { setSelectedVenue(data) }} placeholder={translations.SelectVenue} />
                                    <Button label={translations.Add} onClick={addVenueToWishlist} className="small-btn" wrapperClass=""
                                        disabled={selectedVenue === null}
                                    />
                                </div>
                            </div>
                            <div className='venue-manage-list wishlist-view wishlist-venues-block'>
                                {
                                    wishlist.venues?.map((item, i) =>
                                        <div className='venue-item' key={i} onClick={(e) => { e.stopPropagation(); navigate(`/venue/${item.id}`) }}>
                                            <Row className='flex-wrap'>
                                                <Col xl={2} lg={2} md={2} sm={2} >
                                                    <img alt="" src={item.image ? item.image : venueDummyImg} className="venue-img" />
                                                </Col>
                                                <Col xl={8} lg={8} md={8} sm={8} className="px-5 d-flex flex-column justify-content-center">
                                                    <div className='name'>{item.venue.name}</div>
                                                    <div className='venue-info'>{item.venue.city}</div>
                                                    <div className='rating-block'>
                                                        <span className='ratings'>  {Array.from(Array(item.venue.ratings_avg_rating).keys(), n => n + 1)?.map(j => <img alt="" src={yellowStar} key={j} />)}</span>
                                                        <span className='reviews'>
                                                            {item.venue.ratings?.length}
                                                            {item.venue.ratings?.length !== 1 ? translations.Reviews : translations.Review}
                                                        </span>
                                                    </div>
                                                    <div className='d-flex'>
                                                        <div className='guests mr-3'>
                                                            <FontAwesomeIcon icon={faMale} className="icon" />
                                                            <span className='guest-details'>{item.venue.standing_capacity}</span>
                                                        </div>
                                                        <div className='guests'>
                                                            <FontAwesomeIcon icon={faChair} className="icon" />
                                                            <span className='guest-details'>{item.venue.seating_capacity}</span>
                                                        </div>
                                                    </div>
                                                </Col>
                                                <Col xl={2} lg={2} md={2} sm={2} className="px-1 d-flex flex-column justify-content-center">
                                                    <div className="d-flex flex-column text-center">
                                                        <span className='fw-600'>  ${item.venue.rent_per_day}</span>
                                                        <span > {translations.RentPerDay1}</span>
                                                    </div>
                                                    <div className='my-3 mx-auto'>
                                                        <img alt="" src={deleteIcon} onClick={() => { setItemToDelete(item.id); setShowModal(true); }} />
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    )}
                            </div>
                        </div>
                        <Modal text={translations.WishlistVenueDeleteConfirm} showModal={showModal}
                            handleClose={() => { setShowModal(false); setItemToDelete(null); }} btn1Text={translations.Yes}
                            btn1Click={deleteVenueFromWishlist} btn2Text={translations.No} showBtnLoader={showBtnLoader} />
                    </>
            }
        </>
    );
};

export default WishlistDetails;