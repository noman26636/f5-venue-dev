import React, { useEffect, useState } from "react";
<<<<<<< HEAD
=======
import venueDummyImg from "../../Assets/images/venue-dummy-img.png";
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import Button from "../Common/Button";
import Pageloader from "../Common/Pageloader";
import { Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import { VenueServices } from "../Venue/VenueServices";
import deleteIcon from "../../Assets/icons/deletebin.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import yellowStar from "../../Assets/icons/yellow-star.svg";
import { faMale, faChair } from "@fortawesome/free-solid-svg-icons";
import MultiselectDD from "../Common/MultiselectDD";
import Modal from "../Common/Modal";
import * as TYPES from '../../Store/actions/types';
import RatingStars from "../Venue/RatingStars";

const WishlistDetails = () => {
  const params = useParams();
  const wishlistId = params.wishlistId;
  const appState = useSelector((state) => {
    return state.app;
  });
  const { userLanguageData,wishlistData } = appState;
  const translations = userLanguageData.translations;
  const [showLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [allVenues, setAllVenues] = useState([]);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [showBtnLoader, setShowBtnLoader] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
const dispatch=useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    getWishlistVenues();
  }, []);
  useEffect(() => {
    getAllVenues();
  }, [wishlist]);
  const getAllVenues = () => {
    VenueServices.getallVenues().then((res) => {
      let allVenueNames = res.venues?.map((item) => {
      if(wishlist?.venues?.map(venue=>venue.venue_id).indexOf(item.id)===-1)
        return { value: item.id, label: item.name };
        else if(!wishlist.venues || wishlist.venues?.length===0)   return { value: item.id, label: item.name };
      });
      allVenueNames = allVenueNames.filter(venue=> venue !== undefined);
      setAllVenues(allVenueNames);
    });
  };
  const getWishlistVenues = () => {
    VenueServices.getWishlistDetails(wishlistId).then((res) => {
      if (!res.isAxiosError) {
        setWishlist(res.wishlist[0]);
        setShowLoader(false);
      }
    });
  };
  const addVenueToWishlist = () => {
    setShowBtnLoader("add");
    VenueServices.addVenueToWishlist({
      venue_id: selectedVenue.value,
      wishlist_id: wishlistId,
    }).then((res) => {
      setShowBtnLoader(null);
      if (!res.isAxiosError) {
        setSelectedVenue(null);
        const index=wishlistData.map(wl=>wl.id).indexOf(Number(wishlistId));
        if(index!==-1)
       {
        const newWl=[...wishlistData];
        newWl[index].venues.push(selectedVenue.value);
<<<<<<< HEAD
        dispatch({ type: TYPES.WISHLIST_DATA, data: [...newWl]});
       }
        toast.success(translations.VenueAddedToWishlist);
        getWishlistVenues();}
      
=======
         dispatch({ type: TYPES.WISHLIST_DATA, data: [...newWl]});
        toast.success(translations.VenueAddedToWishlist);
        getWishlistVenues();}
      }
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
    });
  };
  const deleteVenueFromWishlist = () => {
    setShowBtnLoader("delete");
    VenueServices.deleteWishlistVenue(wishlistId, itemToDelete).then((res) => {
    setShowBtnLoader(null);
      if (!res.isAxiosError) {
        const index=wishlistData.map(wl=>wl.id).indexOf(Number(wishlistId));
        if(index!==-1)
       {
        const newWl=[...wishlistData];
    newWl[index].venues=   newWl[index].venues.filter(venueId => venueId !== itemToDelete);
         dispatch({ type: TYPES.WISHLIST_DATA, data: [...newWl]});
<<<<<<< HEAD
       
       }
       setShowModal(false);
       toast.info(translations.WishlistVenueDeleted);
       getWishlistVenues();
       setItemToDelete(null);
      }
      
    });
  };
  const shareWishlist = () => {
    if(navigator && navigator?.clipboard)
    {navigator.clipboard.writeText(window.location.href);
      toast.success(translations.ShareLink, { autoClose: 5000 });
    }
    else
    {
        const textArea = document.createElement("textarea");
        textArea.value = window.location.href;
        document.body.prepend(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          toast.success(translations.ShareLink, { autoClose: 5000 });
        } catch (err) {
          console.error('Unable to copy to clipboard', err);
        }
        document.body.removeChild(textArea);
     }
=======
        setShowModal(false);
        setItemToDelete(null);
        toast.info(translations.WishlistVenueDeleted);
        getWishlistVenues();
       }
      }
    });
  };
  const shareWishlist = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success(translations.ShareLink, { autoClose: 5000 });
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
  };
  return (
    <>
      {showLoader ? (
        <Pageloader />
      ) : (
        <>
<<<<<<< HEAD
          <div className="wishlist-details-view venue-manage-view">
=======
          <div className="wishlist-details-view">
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
            <div className="heading-block">
              <div className="left-block">
                <div className="name-block">
                  <div className="name">{wishlist.name}</div>
                </div>
                <div className="info-block">
              {  wishlist.venues &&
                <span className="info">
                    {wishlist.venues.length} {wishlist?.venues?.length === 1? translations.Venue: translations.Venues}
                  </span>
                  }
                  <span className="mx-2">|</span>
                  <div className="info">
                    {translations.Created}:
                    <span className="fw-600 mx-1">
                      {new Date(wishlist.created_at).toDateString()}
                    </span>
                  </div>
                  {/* <span className='mx-2'>|</span>
<<<<<<< HEAD
                  <div className='info'>{translations.Updated}:   {new Date(wishlist.updated_at).toDateString()} </div> */}
=======
                                        <div className='info'>{translations.Updated}:   {new Date(wishlist.updated_at).toDateString()} </div> */}
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
                </div>
              </div>
              <div className="right-block">
                <MultiselectDD
                  isMulti={false}
                  options={allVenues}
                  name="selectedVenue"
                  value={selectedVenue}
                  onChange={(data) => {
                    setSelectedVenue(data);
                  }}
                  placeholder={translations.SelectVenue}
                />
                <Button
                  label={translations.Add}
                  onClick={addVenueToWishlist}
                  className="small-btn"
                  wrapperClass="mr-3"
                  disabled={selectedVenue === null}
                />
                <Button
                  label={translations.Share}
                  onClick={shareWishlist}
                  className="small-btn"
                />
              </div>
            </div>
<<<<<<< HEAD
            <div className="venue-manage-list">
=======
            <div className="venue-manage-list wishlist-view wishlist-venues-block">
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
              {wishlist.venues?.map((item, i) => {
               return <div
                  className="venue-item"
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/venue/${item.id}`);
                  }}
                >
                  <Row className="flex-wrap">
                    <Col xl={2} lg={2} md={2} sm={2}>
<<<<<<< HEAD
                      {<img
                        alt=""
                        src={item.venue.images ?item.venue.images[0]?.image_path_thumbnail:""}
                        className="venue-img"
                      />}
=======
                      <img
                        alt=""
                        src={item.image ? item.image : venueDummyImg}
                        className="venue-img"
                      />
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
                    </Col>
                    <Col
                      xl={8}
                      lg={8}
                      md={8}
                      sm={8}
<<<<<<< HEAD
                      className="px-5 venue-details"
=======
                      className="px-5 d-flex flex-column justify-content-center"
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
                    >
                      <div className="name">{item.venue.name}</div>
                      <div className="venue-info">{item.venue.city}</div>
                      <div className="rating-block">
                       <RatingStars rating={item.venue.ratings_avg_rating} />
                      {item.venue.ratings_count !== 0 && <span className="reviews">
                          {item.venue.ratings_count} {item.venue.ratings_count !== 1 ? translations.Reviews: translations.Review}
                        </span>}
                      </div>
                      <div className="d-flex">
                        <div className="guests mr-3">
                          <FontAwesomeIcon icon={faMale} className="icon" />
                          <span className="guest-details">
                            {item.venue.standing_capacity}
                          </span>
                        </div>
                        <div className="guests">
                          <FontAwesomeIcon icon={faChair} className="icon" />
                          <span className="guest-details">
                            {item.venue.seating_capacity}
                          </span>
                        </div>
                      </div>
                    </Col>
                    <Col
                      xl={2}
                      lg={2}
                      md={2}
                      sm={2}
                      className="px-1 d-flex flex-column justify-content-center"
                    >
                      <div className="d-flex flex-column text-center">
                        <span className="fw-600">
                          
                          ${item.venue.rent_per_day}
                        </span>
                        <span> {translations.RentPerDay1}</span>
                      </div>
                      <div className="my-3 mx-auto">
                        <img
                          alt=""
                          src={deleteIcon}
                          onClick={(e) => {
                            e.stopPropagation();
                            setItemToDelete(item.venue_id);
                            setShowModal(true);
                          }}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
})}
            </div>
          </div>
          <Modal
            text={translations.WishlistVenueDeleteConfirm}
            showModal={showModal}
            handleClose={() => {
              setShowModal(false);
              setItemToDelete(null);
            }}
            btn1Text={translations.Yes}
            btn1Click={deleteVenueFromWishlist}
            btn2Text={translations.No}
            showBtnLoader={showBtnLoader==="delete"}
          />
        </>
      )}
    </>
  );
};

export default WishlistDetails;
