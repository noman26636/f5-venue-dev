import React, { useEffect, useRef, useState } from "react";
import { Col, Row } from "reactstrap";
import { VenueServices } from "./VenueServices";
import location from "../../Assets/icons/location1.svg";
import tick from "../../Assets/icons/yellow-tick.svg";
import foodIcon from "../../Assets/icons/fork-knife.svg";
import techIcon from "../../Assets/icons/wrench.svg";
import cakeIcon from "../../Assets/icons/cake.svg";
import micIcon from "../../Assets/icons/microphone.svg";
import seating from "../../Assets/icons/seated.svg";
import standing from "../../Assets/icons/standing.svg";
import classroomIcon from "../../Assets/icons/classroom.svg";
import theater from "../../Assets/icons/theater.svg";
import banquet from "../../Assets/icons/banquet.svg";
import conference from "../../Assets/icons/conference.svg";
import uShapeIcon from "../../Assets/icons/UShape.svg";
import floorArea from "../../Assets/icons/floorArea.svg";
import buildingIcon from "../../Assets/icons/building.svg";
import heartRed from "../../Assets/icons/heart-red.svg";
import heartWhite from "../../Assets/icons/heartRedBorder.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import TextField from "../Common/TextField";
import TextArea from "../Common/TextArea";
import Button from "../Common/Button";
import IntlMessageFormat from "intl-messageformat";
import { useNavigate, useParams } from "react-router-dom";
import phone from "../../Assets/icons/phone.svg";
import mail from "../../Assets/icons/mail.svg";
import { useDispatch, useSelector } from "react-redux";
import * as TYPES from "../../Store/actions/types";
import Calendar from "react-calendar";
import { toast } from "react-toastify";
import { Constants } from "../../Configurations/Constants";
import { AccountServices } from "../Signup/AccountServices";
import WishlistModal from "../Wishlist/WishlistModal";
import ImageSlider from "../Common/ImageSlider";
import Pageloader from "../Common/Pageloader";
import RatingStars from "./RatingStars";
import { ReviewsSlider } from "./ReviewsSlider";
import { SimilarVenues } from "./SimilarVenues";
import { getFormattedDate } from "../../Utils/indexUtils";
import ReviewVenueModal from "./ReviewVenueModal";
import L from "leaflet";
const initialFormValues = {
  eventDate: new Date(),
  content: "",
  name: "",
  company: "",
  email: "",
  phone: "",
};
const VenueDetails = () => {
  const mapContainerRef = useRef(null);
  const appState = useSelector((state) => {
    return state.app;
  });
  const { userLanguageData, wishlistData } = appState;
  const translations = userLanguageData.translations;
  const [venue, setVenue] = useState({});
  const [values, setValues] = useState(initialFormValues);
  const [reviewValues, setReviewValues] = useState({ body: "", rating: 0 });
  const [errors, setErrors] = useState({});
  const [showLoader, setShowLoader] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showBtnLoader, setShowBtnLoader] = useState(null);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [services, setServices] = useState({});
  const [eventTypesList, setEventTypesList] = useState([]);
  const [venueTypesList, setVenueTypesList] = useState([]);
  const [activitiesList, setActivitiesList] = useState([]);
  const [wishlists, setWishlists] = useState([]);
  const [map, setMap] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const venueId = params.venueId;
  useEffect(() => {
    getVenueDetails();
    getServices();
    getAllWishlists();
    return () => {
      if (map) map.remove();
    };
  }, []);
  const postReview = () => {
    setShowBtnLoader("review");
    VenueServices.postReview(venueId, reviewValues).then((res) => {
      setShowBtnLoader(null);
      if (!res.isAxiosError) {
        toast.success(translations.ReviewSubmitted);
        getVenueDetails();
        setShowReviewModal(false);
      }
    });
  };
  const handleReviewModalClose = () => {
    setReviewValues({ body: "", rating: 0 });
    setShowReviewModal(false);
  };
  const getServices = () => {
    VenueServices.getConfigList().then((res) => {
      if (!res.isAxiosError) {
        const servicesList = res.services?.reduce(function (r, a) {
          r[a.service_name] = r[a.service_name] || [];
          r[a.service_name].push(a);
          return r;
        }, Object.create(null));
        setServices(servicesList);
        setVenueTypesList(res.venue_types);
        setEventTypesList(res.event_types);
        setActivitiesList(res.activities);
      }
    });
  };
  const authState = useSelector((state) => {
    return state.auth;
  });
  const isLoggedIn = !!authState?.user?.access_token;
  const dispatch = useDispatch();
  const getAllWishlists = () => {
    if (!isLoggedIn) setWishlists(wishlistData);
    else {
      VenueServices.getAllWishlists().then((res) => {
        if (!res.isAxiosError) {
          setWishlists(res.wishlists);
        }
      });
    }
  };
  const addToWishlist = (title, venueId, wishlistId) => {
    setShowBtnLoader("wishlist");
    if (!wishlistId) {
      VenueServices.addWishlist({ name: title, description: title }).then(
        (res) => {
          if (!res.isAxiosError) {
            if (res?.wishlist?.id) {
              VenueServices.addVenueToWishlist({
                venue_id: venueId,
                wishlist_id: res.wishlist.id,
              }).then((res1) => {
                setShowBtnLoader(null);
                if (!res1.isAxiosError) {
                  toast.success(translations.VenueAddedToWishlist);
                  setShowWishlistModal(false);
                  const newWl = { ...res.wishlist };
                  newWl.venues = [venueId];
                  const newWlArr = [...wishlistData];
                  newWlArr.push(newWl);
                  dispatch({ type: TYPES.WISHLIST_DATA, data: newWlArr });
                  setWishlists(newWlArr);
                  getVenueDetails();
                }
              });
            } else {
              setShowBtnLoader(null);
            }
          } else {
            setShowBtnLoader(null);
          }
        }
      );
    } else {
      VenueServices.addVenueToWishlist({
        venue_id: venueId,
        wishlist_id: wishlistId,
      }).then((res) => {
        setShowBtnLoader(null);
        if (!res.isAxiosError) {
          toast.success(translations.VenueAddedToWishlist);
          setShowWishlistModal(false);
          const index = wishlistData
            .map((wl) => wl.id)
            .indexOf(Number(wishlistId));
          if (index !== -1) {
            const newWl = [...wishlistData];
            newWl[index].venues.push(venueId);
            dispatch({ type: TYPES.WISHLIST_DATA, data: [...newWl] });
            if (!isLoggedIn) setWishlists(newWl);
          }
          getVenueDetails();
        }
      });
    }
  };
  const handleInputChange = ({ target }) => {
    let value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    if (name === "eventDate") value = new Date(value);
    setValues({
      ...values,
      [name]: value,
    });
  };
  const validate = (fieldValues = values) => {
    let isValid = true;
    const field = {};
    if (fieldValues.eventDate === null) {
      field.eventDate = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.content?.trim().length === 0) {
      field.content = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.name?.trim().length === 0) {
      field.name = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (
      fieldValues.email?.trim().length === 0 ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)
    ) {
      field.email = translations.ValidEmailRequired;
      isValid = false;
    }
    if (fieldValues.phone?.trim().length === 0) {
      field.phone = translations.EmptyFieldMsg;
      isValid = false;
    } else if (!/^[+]*[\d -]{5,16}[\d]$/.test(fieldValues.phone)) {
      field.phone = translations.ValidPhoneRequired;
      isValid = false;
    }
    setErrors({
      ...field,
    });
    return isValid;
  };
  const getVenueDetails = () => {
    VenueServices.getVenueDetails(venueId).then((res) => {
      setShowLoader(false);
      if (!res.isAxiosError && res.venue) {
        res.venue.groupedByDateAvailabilities = setAvailabilities(
          res.venue?.availabilities
        );
        setVenue({
          ...res.venue,
          isFavourite: res.isFavourite,
          similarVenues: res.similar || [],
        });
        if (res.venue && res.venue?.longitude && res.venue?.latitude) {
          const map = L.map("map").setView(
            [res.venue.longitude, res.venue.latitude],
            8
          );
          const marker = L.marker([
            res.venue.longitude,
            res.venue.latitude,
          ]).addTo(map);
          L.tileLayer(
            `https://api.mapbox.com/styles/v1/devhamo/cl7x58ru6002p14rspm04x7e3/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}`,
            {
              maxZoom: 18,
              tileSize: 512,
              zoomOffset: -1,
              accessToken: Constants.mapboxToken,
              debounceMoveend: true,
            }
          ).addTo(map);
        }
      } else navigate(`/venueList`);
    });
  };
  useEffect(() => {
    if (submitted) validate();
  }, [values]);
  const setAvailabilities = (availabilitiesList) => {
    return availabilitiesList?.reduce(function (r, a) {
      let key = new Date(a.start_date).toDateString();
      r[key] = r[key] || 0;
      let duration =
        (new Date(a.end_date).getTime() - new Date(a.start_date).getTime()) /
        3600000;
      r[key] = r[key] + duration;
      return r;
    }, Object.create(null));
  };
  const getTitle = (serviceName) => {
    switch (serviceName) {
      case "Food and drinks":
        return translations.FoodAndDrinks;
      case "Technology":
        return translations.Technology;
      case "In the venue":
        return translations.Onsite;
      case "Equipment":
        return translations.Equipment;
      default:
        return "";
    }
  };
  const getIcon = (serviceName) => {
    switch (serviceName) {
      case "Food and drinks":
        return foodIcon;
      case "Technology":
        return techIcon;
      case "In the venue":
        return cakeIcon;
      case "Equipment":
        return micIcon;
      default:
        return "";
    }
  };
  const sendInquiry = () => {
    setSubmitted(true);
    if (!validate()) return;
    setShowBtnLoader("inquiry");
    let apiObj = {
      event_date: getFormattedDate(values.eventDate),
      description_of_event: values.content,
      user_name: values.name,
      user_email: values.email,
      company: values.company,
      phone_number: values.phone,
      venue_id: venueId,
    };
    AccountServices.sendInquiry(apiObj).then((res) => {
      setShowBtnLoader(null);
      if (!res.isAxiosError) {
        setSubmitted(false);
        toast.success(translations.InquirySent);
        setValues(initialFormValues);
      }
    });
  };
  const setClass = (date) => {
    // 0-8=>partially ->yellow
    //>8 booked ->red
    //else green
    date = date.toDateString();
    if (
      venue.groupedByDateAvailabilities &&
      Object.keys(venue.groupedByDateAvailabilities).length > 0
    ) {
      if (venue.groupedByDateAvailabilities[date]) {
        console.log(venue.groupedByDateAvailabilities[date]);
        return venue.groupedByDateAvailabilities[date] > 0 &&
          venue.groupedByDateAvailabilities[date] < 8
          ? "bg-green1"
          : venue.groupedByDateAvailabilities[date] >= 8
          ? "bg-red1"
          : new Date(date) >= new Date().getTime()
          ? "bg-green2"
          : "";
      } else
        return new Date(date).getTime() >= new Date().getTime()
          ? "bg-green2"
          : "";
    } else {
      if (venue.availabilities?.length > 0) {
        return new Date(date).getTime() >= new Date().getTime()
          ? "bg-green2"
          : "";
      } else return "";
    }
  };
  const handleWishlistClick = () => {
    setShowWishlistModal(true);
  };
  const getWishlistIds = () => {
    //this function return ids of wishlists in which this venue is added.. to be used for guest user
    let wishlistIds = [];
    if (isLoggedIn) {
      if (venue.isFavourite?.length > 0)
        wishlistIds = venue.isFavourite.map((wl) => wl.id);
    } else {
      for (let i = 0; i < wishlistData?.length; i++) {
        if (wishlistData[i]?.venues?.indexOf(Number(venueId)) !== -1) {
          wishlistIds.push(wishlistData[i]?.id);
          continue;
        }
      }
    }
    return wishlistIds;
  };
  return (
    <>
      {showLoader ? (
        <Pageloader />
      ) : (
        <div className="venue-details-view">
          <div className="venue-details-header">
            <div className="details">
              <div className="d-flex align-items-center mb-4">
                <div className="name">{venue.name}</div>
                {isLoggedIn && venue?.status === "Enabled" && (
                  <Button
                    label={translations.PostReview}
                    onClick={() => setShowReviewModal(true)}
                    wrapperClass="ml-auto"
                    className="small-btn"
                  />
                )}
              </div>
              <div className="rating-address-block">
                <div className="rating-block">
                  <span>{venue.city} </span>
                  <span className="mx-2 d-md-none">|</span>
                  <div className="rating">
                    <RatingStars rating={venue.ratings_avg_rating} />
                  </div>
                  <div className="rating ml-3">
                    {venue.ratings?.length}{" "}
                    {venue.ratings?.length !== 1
                      ? translations.Reviews
                      : translations.Review}
                  </div>
                </div>
                <div className="address-block">
                  <img alt="" src={location} className="mx-2" />
                  <span>
                    {venue.street_address} {venue.zip_code}
                  </span>
                </div>
                <div className="wishlist-block" onClick={handleWishlistClick}>
                  <img
                    alt=""
                    src={getWishlistIds().length > 0 ? heartRed : heartWhite}
                    className="mx-2"
                    width={25}
                    height={25}
                  />
                  <span>
                    {getWishlistIds().length > 0
                      ? translations.AddedToWishlist
                      : translations.AddToWishlist}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Row className="venue-details-body">
            <Col xl={8} lg={8} className="left-content">
              {/* Image slider */}
              {venue.images?.length > 0 && (
                <div className="mt-4">
                  <ImageSlider items={venue.images} />
                </div>
              )}
              {/* Details */}
              <div className="details mt-4">
                <div className="title">{translations.Details}</div>
                <div className="venue-desc">{venue.long_description}</div>
              </div>
              {/* Capacity */}
              <div className="capacity mt-4">
                <div className="title">{translations.Capacity}</div>
                <div className="capacity-info">
                  <div className="info-item">
                    <img
                      className="capacity-icons"
                      src={seating}
                      alt="Seating Capacity Icon"
                    />
                    <div className="fw-600">
                      {venue.seating_capacity ? venue.seating_capacity : 0}
                    </div>
                    <div className="fs-14">
                      {translations.Seating} {translations.capacity}
                    </div>
                  </div>
                  <div className="info-item">
                    <img
                      className="capacity-icons"
                      src={standing}
                      alt="Standing Capacity Icon"
                    />

                    <div className="fw-600">
                      {venue.standing_capacity ? venue.standing_capacity : 0}
                    </div>
                    <div className="fs-14">
                      {translations.Standing} {translations.capacity}
                    </div>
                  </div>
                  <div className="info-item">
                    <img
                      className="capacity-icons"
                      src={classroomIcon}
                      alt="Classroom Capacity Icon"
                    />
                    <div className="fw-600">
                      {venue?.capacity?.classroom
                        ? venue?.capacity?.classroom
                        : "-"}
                    </div>
                    <div className="fs-14">{translations.Classroom}</div>
                  </div>
                  <div className="info-item">
                    <img
                      className="capacity-icons"
                      src={theater}
                      alt="Theater Capacity Icon"
                    />
                    <div className="fw-600">
                      {venue?.capacity?.theatre
                        ? venue?.capacity?.theatre
                        : "-"}
                    </div>
                    <div className="fs-14">{translations.Theater}</div>
                  </div>
                  <div className="info-item">
                    <img
                      className="capacity-icons"
                      src={banquet}
                      alt="Banquet Capacity Icon"
                    />
                    <div className="fw-600">
                      {venue?.capacity?.banquet
                        ? venue?.capacity?.banquet
                        : "-"}
                    </div>
                    <div className="fs-14">{translations.Banquet}</div>
                  </div>
                  <div className="info-item">
                    <img
                      className="capacity-icons"
                      src={conference}
                      alt="Conference Capacity Icon"
                    />
                    <div className="fw-600">
                      {venue?.capacity?.conference
                        ? venue?.capacity?.conference
                        : "-"}
                    </div>
                    <div className="fs-14">{translations.Conference}</div>
                  </div>
                  <div className="info-item">
                    <img
                      className="capacity-icons"
                      src={uShapeIcon}
                      alt="U-Shape Capacity Icon"
                    />
                    <div className="fw-600">
                      {venue?.capacity?.ushape ? venue?.capacity?.ushape : "-"}
                    </div>
                    <div className="fs-14">{translations.U_shape}</div>
                  </div>
                  <div className="info-item">
                    <img
                      className="capacity-icons floorArea"
                      src={floorArea}
                      alt="Floor Capacity Icon"
                    />
                    <div className="fw-600">
                      {venue?.capacity?.floor_area
                        ? `${venue?.capacity?.floor_area} m²`
                        : "-"}
                    </div>
                    <div className="fs-14">{translations.FloorArea} </div>
                  </div>
                </div>
                {venue.additional_info && venue.additional_info?.length !== 0 && (
                  <p>
                    <span className="fw-600">{translations.Note}:</span>
                    {venue.additional_info}
                  </p>
                )}
              </div>
              {/* Pricing */}
              <div className="capacity mt-4">
                <div className="title">{translations.Pricing}</div>
                <div className="capacity-info">
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.price_per_person ? venue.price_per_person : "-"}
                    </div>
                    <div className="fs-14"> {translations.PricePerPerson}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.rent_per_hour ? venue.rent_per_hour : "-"}
                    </div>
                    <div className="fs-14"> {translations.RentPerHour}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {" "}
                      {venue.rent_per_day ? venue.rent_per_day : "-"}
                    </div>
                    <div className="fs-14">{translations.RentPerDay}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.minimum_spend ? venue.minimum_spend : "-"}
                    </div>
                    <div className="fs-14">{translations.SalesGuarantee}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.reservation_deposit
                        ? venue.reservation_deposit
                        : "-"}
                    </div>
                    <div className="fs-14">{translations.ReservationFee}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.cleaning_fee ? venue.cleaning_fee : "-"}
                    </div>
                    <div className="fs-14">{translations.CleaningFee}</div>
                  </div>
                </div>
                {venue.cancellation_policy &&
                  venue.cancellation_policy?.length !== 0 && (
                    <p>
                      <span className="fw-600">
                        {translations.CancellationPolicy}:
                      </span>
                      {venue.cancellation_policy}
                    </p>
                  )}
              </div>
              {/* Facilities */}
              <div className="facilities">
                <div className="title">{translations.AmenitiesFacilities}</div>
                <div className="facilities-list-wrap">
                  {Object.keys(services)?.map((service, i) => {
                    return (
                      <div className="facilities-list-block" key={i}>
                        <div className="d-flex align-items-center">
                          <img
                            alt=""
                            width={18}
                            height={18}
                            className="service-icon mr-3"
                            src={getIcon(service)}
                          />
                          <span className="sub-title">{getTitle(service)}</span>
                        </div>
                        <ul className="facilities-list">
                          {services[service]?.map((item, j) => {
                            return (
                              <li
                                key={j}
                                className={`d-flex align-items-center ${
                                  venue.services
                                    ?.map((i) => i.admin_services_facilities)
                                    .indexOf(item.id) === -1 && "striked-text"
                                }`}
                              >
                                {venue.services
                                  ?.map((i) => i.admin_services_facilities)
                                  .indexOf(item.id) !== -1 && (
                                  <img alt="" src={tick} className="mr-3" />
                                )}
                                <span> {item.value}</span>
                              </li>
                            );
                          })}
                        </ul>
                      </div>
                    );
                  })}
                  {
                    <div className="facilities-list-block">
                      <div className="d-flex align-items-center">
                        <img
                          alt=""
                          width={18}
                          height={18}
                          className="service-icon mr-3"
                          src={micIcon}
                        />
                        <span className="sub-title">
                          {translations.EventTypes}
                        </span>
                      </div>
                      <ul className="facilities-list">
                        {eventTypesList?.map((item, j) => {
                          return (
                            <li
                              key={j}
                              className={`d-flex align-items-center ${
                                venue.venueet
                                  ?.map((i) => i.admin_event_types_id)
                                  .indexOf(item.id) === -1 && "striked-text"
                              }`}
                            >
                              {venue.venueet
                                ?.map((i) => i.admin_event_types_id)
                                .indexOf(item.id) !== -1 && (
                                <img alt="" src={tick} className="mr-3" />
                              )}
                              <span> {item.name}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  }
                  {
                    <div className="facilities-list-block">
                      <div className="d-flex align-items-center">
                        <img
                          alt=""
                          width={18}
                          height={18}
                          className="service-icon mr-3"
                          src={buildingIcon}
                        />
                        <span className="sub-title">
                          {translations.VenueType}
                        </span>
                      </div>
                      <ul className="facilities-list">
                        {venueTypesList?.map((item, j) => {
                          return (
                            <li
                              key={j}
                              className={`d-flex align-items-center ${
                                venue.types
                                  ?.map((i) => i.admin_venue_types_id)
                                  .indexOf(item.id) === -1 && "striked-text"
                              }`}
                            >
                              {venue.types
                                ?.map((i) => i.admin_venue_types_id)
                                .indexOf(item.id) !== -1 && (
                                <img alt="" src={tick} className="mr-3" />
                              )}
                              <span> {item.name}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  }
                  {
                    <div className="facilities-list-block">
                      <div className="d-flex align-items-center">
                        <img
                          alt=""
                          width={18}
                          height={18}
                          className="service-icon mr-3"
                          src={buildingIcon}
                        />
                        <span className="sub-title">
                          {translations.Activities}
                        </span>
                      </div>
                      <ul className="facilities-list">
                        {activitiesList?.map((item, j) => {
                          return (
                            <li
                              key={j}
                              className={`d-flex align-items-center ${
                                venue.activities
                                  ?.map((i) => i.admin_activities_id)
                                  .indexOf(item.id) === -1 && "striked-text"
                              }`}
                            >
                              {venue.activities
                                ?.map((i) => i.admin_activities_id)
                                .indexOf(item.id) !== -1 && (
                                <img alt="" src={tick} className="mr-3" />
                              )}
                              <span> {item.name}</span>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  }
                </div>
              </div>
              {/* Videos */}
              {venue.videos?.length !== 0 && (
                <div className="videos-block">
                  <div className="title">{translations.Videos}</div>
                  <div className="videos">
                    {venue.videos?.map((item, i) => {
                      return (
                        <iframe title="iframe" src={item.video_url} key={i} />
                      );
                    })}
                  </div>
                </div>
              )}
              {/* Tours */}
              {venue.tours?.length !== 0 && (
                <div className="videos-block">
                  <div className="title">{translations._3DViews}</div>
                  <div className="videos">
                    {venue.tours?.map((item, i) => {
                      return <iframe title="iframe" src={item.url} key={i} />;
                    })}
                  </div>
                </div>
              )}
            </Col>
            <Col xl={4} lg={4} className="right-content">
              {/* Calendar */}
              <div className="calendar">
                <div className="title">{translations.BookingsandInquiries}</div>
                <Calendar
                  onChange={(e) => {
                    const obj = { target: { name: "eventDate", value: e } };
                    handleInputChange(obj);
                  }}
                  value={values.eventDate}
                  tileClassName={({ activeStartDate, date, view }) =>
                    setClass(date)
                  }
                  minDate={new Date()}
                />
                {venue.availabilities?.length > 0 ? (
                  <div className="calendar-key">
                    <div className="key">
                      <span className="square-box available"></span>
                      <span className="key-text">{translations.Available}</span>
                    </div>
                    <div className="key">
                      <span className="square-box"></span>
                      <span className="key-text">
                        {translations.PartiallyAvailable}
                      </span>
                    </div>
                    <div className="key">
                      <span className="square-box booked"></span>
                      <span className="key-text">{translations.Booked}</span>
                    </div>
                  </div>
                ) : (
                  <div className="calendar-key gap-2">
                    <FontAwesomeIcon icon={faInfoCircle} className="icon" />
                    <span className="key-text">
                      {translations.AvailabilityUnknown}
                    </span>
                  </div>
                )}
              </div>
              {venue?.status === "Enabled" && (
                <div className="inquiry-block">
                  <TextField
                    name="eventDate"
                    placeholder={translations.SelectDate}
                    onChange={handleInputChange}
                    type="date"
                    error={errors.eventDate}
                    value={values.eventDate}
                    className="text-field-2"
                  />
                  <TextArea
                    name="content"
                    placeholder={translations.InquiryDesc}
                    onChange={handleInputChange}
                    error={errors.content}
                    value={values.content}
                    className="text-field-2"
                    rows={8}
                    onFocus={() => {
                      if (values.content === "")
                        setValues({
                          ...values,
                          content: translations.InquiryDesc,
                        });
                    }}
                  />
                  <TextField
                    name="name"
                    placeholder={translations.Name}
                    type="text"
                    onChange={handleInputChange}
                    error={errors.name}
                    value={values.name}
                    className="text-field-2"
                  />
                  <TextField
                    name="email"
                    placeholder={translations.Email}
                    type="email"
                    onChange={handleInputChange}
                    error={errors.email}
                    value={values.email}
                    className="text-field-2"
                  />
                  <TextField
                    name="company"
                    placeholder={`${translations.Company} (${translations.Optional})`}
                    type="text"
                    onChange={handleInputChange}
                    error={errors.company}
                    value={values.company}
                    className="text-field-2"
                  />
                  <TextField
                    name="phone"
                    placeholder={translations.PhoneNumber}
                    type="tel"
                    onChange={handleInputChange}
                    error={errors.phone}
                    value={values.phone}
                    className="text-field-2"
                  />
                  <Button
                    label={translations.SendInquiry}
                    onClick={sendInquiry}
                    showBtnLoader={showBtnLoader === "inquiry"}
                    wrapperClass="w-100"
                  />
                  <div className="terms-text">
                    {new IntlMessageFormat(
                      translations.SendInquiryTerms,
                      userLanguageData.language
                    ).format({
                      a: (chunk1) => (
                        <a
                          className="fw-600"
                          key={1}
                          onClick={() => {
                            navigate(`/terms`);
                          }}
                        >
                          {chunk1}
                        </a>
                      ),
                      b: (chunk2) => (
                        <a
                          key={2}
                          className="fw-600"
                          onClick={() => {
                            navigate(`/privacy`);
                          }}
                        >
                          {chunk2}
                        </a>
                      ),
                    })}
                  </div>
                </div>
              )}

              {venue.latitude && venue.longitude && (
                // <div className="map" ref={mapContainerRef}></div>

                <div className={`map`} id="map" ref={mapContainerRef} />
              )}
              <div className="contact info-block">
                <ul className="contact-list">
                  <li className="list-item">
                    <div className="fw-600"> {translations.InfoText1_h}</div>
                    <div className="text">{translations.InfoText1}</div>
                  </li>
                  <li className="list-item">
                    <div className="fw-600"> {translations.InfoText2_h}</div>
                    <div className="text">{translations.InfoText2}</div>
                  </li>
                  <li className="list-item">
                    <div className="fw-600"> {translations.InfoText3_h}</div>
                    <div className="text">{translations.InfoText3}</div>
                  </li>
                </ul>
              </div>
              {venue?.contact && (
                <div className="contact">
                  <div className="sub-title">{translations.ContactInfo}</div>
                  <ul className="contact-list">
                    {venue.contact?.phone_number && (
                      <li className="list-item">
                        <img src={phone} alt="icon" />
                        <div className="text">
                          {venue.contact?.phone_number}
                        </div>
                      </li>
                    )}
                    <li className="list-item">
                      <img src={mail} alt="icon" />
                      <div className="text">{venue.contact?.email}</div>
                    </li>
                    <li className="list-item">
                      <img src={location} alt="icon" />
                      <div className="text">{venue.contact?.company_name}</div>
                    </li>
                  </ul>
                </div>
              )}
            </Col>
          </Row>
          {/* Similar venues */}
          {venue.similarVenues?.length > 0 && (
            <SimilarVenues similarVenuesList={venue.similarVenues} />
          )}
          {/* Review and rating block */}
          {venue.ratings?.length > 0 && (
            <ReviewsSlider
              reviews={venue.ratings}
              avgRating={venue.ratings_avg_rating}
            />
          )}
        </div>
      )}
      <WishlistModal
        allWishlists={wishlists}
        showModal={showWishlistModal}
        handleClose={() => setShowWishlistModal(false)}
        wishlistVenue={venue}
        addToWishlist={addToWishlist}
        showBtnLoader={showBtnLoader === "wishlist"}
        isLoggedIn={isLoggedIn}
        getWishlistIds={getWishlistIds}
      />
      <ReviewVenueModal
        venueId={venueId}
        showModal={showReviewModal}
        handleClose={handleReviewModalClose}
        showBtnLoader={showBtnLoader === "review"}
        setShowBtnLoader={setShowBtnLoader}
        postReview={postReview}
        values={reviewValues}
        setValues={setReviewValues}
      />
    </>
  );
};

export default VenueDetails;
