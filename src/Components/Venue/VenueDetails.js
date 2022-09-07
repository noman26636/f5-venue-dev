import React, { useEffect, useRef, useState } from "react";
import yellowStar from "../../Assets/icons/yellow-star.svg";
import { Col, Row } from "reactstrap";
import { VenueServices } from "./VenueServices";
import location from "../../Assets/icons/location1.svg";
import tick from "../../Assets/icons/yellow-tick.svg";
import foodIcon from "../../Assets/icons/fork-knife.svg";
import techIcon from "../../Assets/icons/wrench.svg";
import cakeIcon from "../../Assets/icons/cake.svg";
import micIcon from "../../Assets/icons/microphone.svg";
import buildingIcon from "../../Assets/icons/building.svg";
import noImg from "../../Assets/images/no-image.png";
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
import mapboxgl from "mapbox-gl";
import { AccountServices } from "../Signup/AccountServices";
import WishlistModal from "../Wishlist/WishlistModal";
import ImageSlider from "../Common/ImageSlider";
import Pageloader from "../Common/Pageloader";
import RatingStars from "./RatingStars";
import { ReviewsSlider } from "./ReviewsSlider";
import { SimilarVenues } from "./SimilarVenues";
import { getFormattedDate } from "../../Utils/indexUtils";
mapboxgl.accessToken = Constants.mapboxToken;

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
  const [errors, setErrors] = useState({});
  const [showLoader, setShowLoader] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showBtnLoader, setShowBtnLoader] = useState(null);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
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
    // if (!isLoggedIn) setWishlists(wishlistData);
    // else getAllWishlists();
    return () => {
      if (map) map.remove();
    };
  }, []);
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
    if (!isLoggedIn) return;
    VenueServices.getAllWishlists().then((res) => {
      if (!res.isAxiosError) {
        setWishlists(res.wishlists);
      }
    });
  };
  const addToWishlist = (title, venueId, wishlistId) => {
    setShowBtnLoader("wishlist");
    if (!wishlistId) {
      VenueServices.addWishlist({ name: title, description: title }).then(
        (res) => {
          if (!res.isAxiosError) {
            if (res?.wishlist?.id) {
              dispatch({
                type: TYPES.WISHLIST_DATA,
                data: [
                  ...wishlistData,
                  { id: Number(res.wishlist.id), name: title },
                ],
              });
              VenueServices.addVenueToWishlist({
                venue_id: venueId,
                wishlist_id: res.wishlist.id,
              }).then((res1) => {
                setShowBtnLoader(null);
                if (!res1.isAxiosError) {
                  getVenueDetails();
                  // dispatch({
                  //   type: TYPES.VENUES_WISHLIST_DATA,
                  //   data: {
                  //     ...venuesWishlistData,
                  //     [venueId]: [
                  //       ...venuesWishlistData[venueId],
                  //       res.wishlist.id,
                  //     ],
                  //   },
                  // });
                  toast.success(translations.VenueAddedToWishlist);
                  setShowWishlistModal(false);
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
          getVenueDetails();

          // dispatch({
          //   type: TYPES.VENUES_WISHLIST_DATA,
          //   data: {
          //     ...venuesWishlistData,
          //     [venueId]: [...venuesWishlistData[venueId], wishlistId],
          //   },
          // });
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
          const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: "mapbox://styles/mapbox/streets-v11",
            center: [res.venue.longitude, res.venue.latitude],
            zoom: 1.5,
            dragPan: false,
          });
          new mapboxgl.Marker({
            color: "#594A45",
            draggable: false,
          })
            .setLngLat([res.venue.longitude, res.venue.latitude])
            .addTo(map);
          setMap(map);
        }
      }
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
    // if (!isLoggedIn) setWishlists(wishlistData);
    // else getAllWishlists();
    setShowWishlistModal(true);
  };
  
  const getWishlistIds = () => {
    debugger
    //this function return ids of wishlists in which this venue is added.. to be used for guest user
    let wishlistIds=[];
    if(isLoggedIn){
      if(venue.isFavourite?.length > 0)
   wishlistIds= venue.isFavourite.map(wl=>wl.id)
    }
    else
   { for (let i = 0; i < wishlists?.length; i++) {
      if (wishlists[i]?.venues?.indexOf(Number(venueId)) !== -1) {
        wishlistIds = wishlists[i]?.id;
        continue;
      }
    }}
    return wishlistIds;
  };
  return (
    <>
      {showLoader ? (
        <Pageloader />
      ) : (
        <div className="venue-details-view">
          <div className="venue-details-header">
            {/* <div
              className="logo"
              style={{
                backgroundImage: `url(${
                  venue.images?.length > 0
                    ? venue.images[0]?.image_path_thumbnail
                    : noImg
                })`,
              }}
            ></div> */}
            <div className="details">
              <div className="name">{venue.name}</div>
              <div className="rating-address-block">
                <div className="rating-block">
                  <span>{venue.city} </span>
                  <span className="mx-2">|</span>
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
                    src={getWishlistIds().length>0 ? heartRed : heartWhite}
                    className="mx-2"
                    width={25}
                    height={25}
                  />
                  <span>
                    {getWishlistIds().length>0
                      ? translations.AddedToWishlist
                      : translations.AddToWishlist}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <Row className="venue-details-body gap-xl-5">
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
                    <div className="fw-600">
                      {venue.seating_capacity ? venue.seating_capacity : 0}
                    </div>
                    <div className="fs-14">
                      {translations.Seating} {translations.capacity}
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.standing_capacity ? venue.standing_capacity : 0}
                    </div>
                    <div className="fs-14">
                      {translations.Standing} {translations.capacity}
                    </div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.classroom ? venue.classroom : "-"}
                    </div>
                    <div className="fs-14">{translations.Classroom}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.theatre ? venue.theatre : "-"}
                    </div>
                    <div className="fs-14">{translations.Theater}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.banquet ? venue.banquet : "-"}
                    </div>
                    <div className="fs-14">{translations.Banquet}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.conference ? venue.conference : "-"}
                    </div>
                    <div className="fs-14">{translations.Conference}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.ushape ? venue.ushape : "-"}
                    </div>
                    <div className="fs-14">{translations.U_shape}</div>
                  </div>
                  <div className="info-item">
                    <div className="fw-600">
                      {venue.floor_area ? `${venue.floor_area} m²` : "-"}
                    </div>
                    <div className="fs-14">{translations.FloorArea} </div>
                  </div>
                </div>
                {venue.additional_info?.length !== 0 && (
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
                    <div className="fw-600">{venue.rent_per_day}</div>
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
                {venue.cancellation_policy?.length !== 0 && (
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
                  //   activeStartDate={values.eventDate}
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
                          navigate("/termsandconditions");
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
                          navigate("/privacypolicy");
                        }}
                      >
                        {chunk2}
                      </a>
                    ),
                  })}
                </div>
              </div>

              {venue.latitude && venue.longitude && (
                <div className="map" ref={mapContainerRef}></div>
              )}
              <div className="contact info-block">
                <ul className="contact-list">
                  <li className="list-item">
                    {/* <img src={phone} alt="icon" /> */}
                    <div className="fw-600"> {translations.InfoText1_h}</div>
                    <div className="text">{translations.InfoText1}</div>
                  </li>
                  <li className="list-item">
                    {/* <img src={phone} alt="icon" /> */}
                    <div className="fw-600"> {translations.InfoText2_h}</div>
                    <div className="text">{translations.InfoText2}</div>
                  </li>
                  <li className="list-item">
                    {/* <img src={phone} alt="icon" /> */}
                    <div className="fw-600"> {translations.InfoText3_h}</div>
                    <div className="text">{translations.InfoText3}</div>
                  </li>
                </ul>
              </div>
              <div className="contact">
                <div className="sub-title">{translations.ContactInfo}</div>
                <ul className="contact-list">
                  <li className="list-item">
                    <img src={phone} alt="icon" />
                    <div className="text">{venue.contact?.phone_number}</div>
                  </li>
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
    </>
  );
};

export default VenueDetails;
