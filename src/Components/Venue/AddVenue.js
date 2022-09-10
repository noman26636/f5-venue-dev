import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Common/Modal";
import { VenueServices } from "./VenueServices";
import { Col, Row } from "reactstrap";
import { useSelector } from "react-redux";
import TextField from "../Common/TextField";
import Button from "../Common/Button";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import plusIconWhite from "../../Assets/icons/plusIconWhiteCircle.svg";
import plusIconBlue from "../../Assets/icons/plusIconBlueCircle.svg";
import saveIconCircle from "../../Assets/icons/saveIconCircle.svg";
import trashIconRed from "../../Assets/icons/trashIconRed.svg";
import trashIconWhite from "../../Assets/icons/trashWhite.svg";
import personImage from "../../Assets/icons/personImage.svg";
import TextArea from "../Common/TextArea";
import FileUpload from "../Common/FileUpload";
import IntlMessageFormat from "intl-messageformat";
import Checkbox from "../Common/Checkbox";
import Pageloader from "../Common/Pageloader";
let imagesObj = {},
  count = 0;
const maxFileSize = "2MB";
const numberOfImages = 10;
const imgMinWidth = 755;
const imgMinHeight = 503;
const maxLinksAllowed = 5;
const initialFormValues = {
  name: "",
  street_address: "",
  zip_code: "",
  city: "",
  long_description: "",
  short_description: "",
  contact_per_name: "",
  company_name: "",
  comp_email: "",
  contact_phone: "",
  contact_website: "",
  contacttype_id: 1,
  contact_image: null,
  ical: "",
  standing_capacity: "",
  seating_capacity: "",
  floorarea: "",
  additional_info: "",
  classroom: "",
  theatre: "",
  banquet: "",
  conference: "",
  ushape: "",
  additional_cap_info: "",
  venue_type: [],
  services: [],
  event_type: [],
  activities: [],
  price_per_person: "",
  rent_per_hour: "",
  rent_per_day: "",
  minimum_spend: "",
  cleaning_fee: "",
  reservation_deposit: "",
  cancellation_policy: "",
  images: [],
  tour3d: [],
  videos: [],
  cost_center: "",
  is_published: 0,
};
function AddVenue() {
  const appState = useSelector((state) => {
    return state.app;
  });
  const navigate = useNavigate();
  const { userLanguageData } = appState;
  const translations = userLanguageData.translations;
  const [showModal, setShowModal] = useState(false);
  const [values, setValues] = useState(initialFormValues);
  const [services, setServices] = useState({});
  const [configs, setConfigs] = useState({});
  const [errors, setErrors] = useState({});
  const [showLoader, setShowLoader] = useState(null);
  const [showPageLoader, setShowPageLoader] = useState(true);
  const [active, setActive] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const params = useParams();
  const venueId = params?.venueId;
  const navLinks = [
    translations.BasicInformation,
    translations.ContactInformation,
    translations.CalendarIntegration,
    translations.Capacity,
    translations.VenueType,
    translations.ServicesFacilities,
    translations.EventTypes,
    translations.Activities,
    translations.Pricing,
    translations.UploadPhotos,
    translations._3DViews,
    translations.Videos,
    translations.InvoicingDetails,
  ];
  useEffect(() => {
    getConfigs();
    if (venueId) getVenueDetails();
    else {
      setShowPageLoader(false);
    }
  }, []);
  useEffect(() => {
    if (submitted) validate();
  }, [values]);
  const getConfigs = () => {
    VenueServices.getConfigList().then((res) => {
      if (!res.isAxiosError) {
        setConfigs(res);
        getServices(res.services);
      }
    });
  };
  const getServices = (servicesArr) => {
    const servicesList = servicesArr?.reduce(function (r, a) {
      r[a.category] = r[a.category] || [];
      r[a.category].push(a);
      return r;
    }, Object.create(null));
    setServices(servicesList);
  };
  const handleInputChange = ({ target }, checkboxValue = null) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    if (checkboxValue) {
      const index = values[name]?.indexOf(checkboxValue);
      const prevData = [...values[name]];
      if (index === -1) {
        prevData.push(checkboxValue);
        setValues({
          ...values,
          [name]: [...prevData],
        });
      } else {
        prevData.splice(index, 1);
        setValues({
          ...values,
          [name]: [...prevData],
        });
      }
    } else
      setValues({
        ...values,
        [name]: value,
      });
  };
  const getVenueDetails = () => {
    setShowPageLoader(true);
    VenueServices.getVenueDetails(venueId).then((res) => {
      setShowPageLoader(false);
      if (!res.isAxiosError) {
        let valuesObj = {},
          venueObj = res.venue;
        Object.assign(valuesObj, {
          name: venueObj.name,
          street_address: venueObj.street_address,
          zip_code: venueObj.zip_code,
          city: venueObj.city,
          long_description: venueObj.long_description,
          short_description: venueObj.short_description,
          contact_per_name: venueObj.contact?.name,
          company_name: venueObj.contact?.company_name,
          comp_email: venueObj.contact?.email,
          contact_phone: venueObj.contact?.phone_number,
          contact_website: venueObj.contact?.website,
          contacttype_id: venueObj.contact?.contacttype_id,
          contact_image: venueObj.contact,
          ical: venueObj.ical,
          standing_capacity: venueObj.standing_capacity,
          seating_capacity: venueObj.seating_capacity,
          additional_cap_info: venueObj.capacity?.additional_info,
          floorarea: venueObj.capacity?.floor_area,
          additional_info: venueObj.additional_info,
          classroom: venueObj.capacity?.classroom,
          theatre: venueObj.capacity?.theatre,
          banquet: venueObj.capacity?.banquet,
          conference: venueObj.capacity?.conference,
          ushape: venueObj.capacity?.ushape,
          venue_type:
            venueObj.types?.length > 0
              ? venueObj.types?.map((item) => item.admin_venue_types_id)
              : [],
          services:
            venueObj.types?.length > 0
              ? venueObj.services?.map((item) => item.admin_services_facilities)
              : [],
          event_type:
            venueObj.types?.length > 0
              ? venueObj.venueet?.map((item) => item.admin_event_types_id)
              : [],
          activities:
            venueObj.types?.length > 0
              ? venueObj.activities?.map((item) => item.admin_activities_id)
              : [],
          rent_per_hour: Number(venueObj.rent_per_hour),
          rent_per_day: Number(venueObj.rent_per_day),
          price_per_person: Number(venueObj.price_per_person),
          minimum_spend: Number(venueObj.minimum_spend),
          cleaning_fee: Number(venueObj.cleaning_fee),
          reservation_deposit: Number(venueObj.reservation_deposit),
          cancellation_policy: venueObj.cancellation_policy,
          images: venueObj.images?.length > 0 ? venueObj.images : [],
          tour3d:
            venueObj.tours?.length > 0
              ? venueObj.tours?.map((item) => item.url)
              : [],
          videos:
            venueObj.videos?.length > 0
              ? venueObj.videos?.map((item) => item.video_url)
              : [],
          cost_center: venueObj.information?.cost_center,
          is_published: venueObj.is_Published,
        });
        setValues(valuesObj);
      }
    });
  };
  const deleteVenue = () => {
    setShowLoader("delete");
    VenueServices.deleteVenue(venueId).then((res) => {
      if (!res.isAxiosError) {
        setShowModal(false);
        navigate("/manageVenues");
        toast.info(translations.VenueDeleted);
      }
    });
  };
  const validate = (fieldValues = values) => {
    let isValid = true;
    const field = {};
    if (fieldValues.name?.trim().length === 0) {
      field.name = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.street_address?.trim().length === 0) {
      field.street_address = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.zip_code.toString()?.trim().length === 0) {
      field.zip_code = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.city?.trim().length === 0) {
      field.city = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.long_description?.trim().length === 0) {
      field.long_description = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.short_description?.trim().length === 0) {
      field.short_description = translations.EmptyFieldMsg;
      isValid = false;
    }
    // if (fieldValues.ical?.trim().length === 0) {
    //   field.ical = translations.EmptyFieldMsg;
    //   isValid = false;
    // }
    if (fieldValues.contact_per_name?.trim().length === 0) {
      field.contact_per_name = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.comp_email?.trim().length === 0) {
      field.comp_email = translations.EmptyFieldMsg;
      isValid = false;
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.comp_email)) {
      field.comp_email = translations.ValidEmailRequired;
      isValid = false;
    }
    if (fieldValues.standing_capacity?.length === 0) {
      field.standing_capacity = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.seating_capacity?.length === 0) {
      field.seating_capacity = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.images?.length === 0) {
      field.images = translations.EmptyFieldMsg;
      isValid = false;
    }
    if (fieldValues.tour3d?.length > 0) {
      fieldValues.tour3d.forEach((link) => {
        if (
          !/^(http:\/\/|https:\/\/)(www\.unrealer\.com\/listings\/|my\.matterport\.com\/show\/\?m=|walkinto\.in\/tour\/|skyview\.fi\/panorama\/|www\.google\.com\/maps\/embed?)([\w\d-\/]+)?([\?].*)?$/.test(
            link
          )
        ) {
          field.tour3d = translations.ValidUrlRequired;
          isValid = false;
          return;
        }
      });
    }
    if (fieldValues.videos?.length > 0) {
      fieldValues.videos.forEach((link) => {
        if (
          !/^(http:\/\/|https:\/\/)(vimeo\.com|player\.vimeo\.com|youtu\.be|www\.youtube\.com)\/([\w\d-\/]+)([\?].*)?$/.test(
            link
          )
        ) {
          field.videos = translations.ValidUrlRequired;
          isValid = false;
          return;
        }
      });
    }
    setErrors({
      ...field,
    });
    return isValid;
  };
  const saveChanges = () => {
    setSubmitted(true);
    if (!validate()) return;
    setShowLoader("add");
    let bodyFormData = new FormData();
    bodyFormData.append("name", values.name);
    bodyFormData.append("street_address", values.street_address);
    bodyFormData.append("zip_code", values.zip_code);
    bodyFormData.append("city", values.city);
    if (values.ical !== "" && values.ical !== null)
      bodyFormData.append("ical", values.ical);
    bodyFormData.append("contacttype_id", values.contacttype_id);
    bodyFormData.append("contact_per_name", values.contact_per_name);
    if (values.contact_image?.src)
      bodyFormData.append("contact_image", values.contact_image.src.file);
    if (values.company_name !== "" && values.company_name !== null)
      bodyFormData.append("company_name", values.company_name);
    bodyFormData.append("comp_email", values.comp_email);
    if (values.contact_phone !== "" && values.contact_phone !== null)
      bodyFormData.append("contact_phone", values.contact_phone);
    if (values.contact_website !== "" && values.contact_website !== null)
      bodyFormData.append("contact_website", values.contact_website);
    if (values.cost_center !== "" && values.cost_center !== null)
      bodyFormData.append("cost_center", values.cost_center);
    if (values.price_per_person !== "" && values.price_per_person !== null)
      bodyFormData.append("price_per_person", values.price_per_person);
    if (values.rent_per_hour !== "" && values.rent_per_hour !== null)
      bodyFormData.append("rent_per_hour", values.rent_per_hour);
    if (values.rent_per_day !== "" && values.rent_per_day !== null)
      bodyFormData.append("rent_per_day", values.rent_per_day);
    if (values.minimum_spend !== "" && values.minimum_spend !== null)
      bodyFormData.append("minimum_spend", values.minimum_spend);
    if (values.cleaning_fee !== "" && values.cleaning_fee !== null)
      bodyFormData.append("cleaning_fee", values.cleaning_fee);
    if (
      values.reservation_deposit !== "" &&
      values.reservation_deposit !== null
    )
      bodyFormData.append("reservation_deposit", values.reservation_deposit);
    bodyFormData.append("standing_capacity", values.standing_capacity);
    if (values.classroom !== "" && values.classroom !== null)
      bodyFormData.append("classroom", values.classroom);
    if (values.theatre !== "" && values.theatre !== null)
      bodyFormData.append("theatre", values.theatre);
    if (values.banquet !== "" && values.banquet !== null)
      bodyFormData.append("banquet", values.banquet);
    if (values.conference !== "" && values.conference !== null)
      bodyFormData.append("conference", values.conference);
    if (values.ushape !== "" && values.ushape !== null)
      bodyFormData.append("ushape", values.ushape);
    bodyFormData.append("seating_capacity", values.seating_capacity);
    if (
      values.additional_cap_info !== "" &&
      values.additional_cap_info !== null
    )
      bodyFormData.append("additional_cap_info", values.additional_cap_info);
    if (
      values.cancellation_policy !== "" &&
      values.cancellation_policy !== null
    )
      bodyFormData.append("cancellation_policy", values.cancellation_policy);
    bodyFormData.append("long_description", values.long_description);
    bodyFormData.append("short_description", values.short_description);
    if (values.floorarea !== "" && values.floorarea !== null)
      bodyFormData.append("floor_area", values.floorarea);
    if (values.additional_info !== "" && values.additional_info !== null)
      bodyFormData.append("additional_info", values.additional_info);
    bodyFormData.append("is_published", values.is_published.toString());

    if (values.activities.length > 0) {
      values.activities.forEach((element, i) => {
        bodyFormData.append(`activities[${i + 1}]`, element);
      });
    }
    if (values.event_type.length > 0) {
      values.event_type.forEach((element, i) => {
        bodyFormData.append(`event_type[${i + 1}]`, element);
      });
    }
    if (values.venue_type.length > 0) {
      values.venue_type.forEach((element, i) => {
        bodyFormData.append(`venue_type[${i + 1}]`, element);
      });
    }
    if (values.services.length > 0) {
      values.services.forEach((element, i) => {
        bodyFormData.append(`services[${i + 1}]`, element);
      });
    }
    if (values.tour3d.length > 0) {
      values.tour3d.forEach((element, i) => {
        if(element!==null && element!=="")
        bodyFormData.append(`tour3d[${i + 1}]`, element);
      });
    }
    if (values.videos.length > 0) {
      values.videos.forEach((element, i) => { 
        if(element!==null && element!=="")
        bodyFormData.append(`videos[${i + 1}]`, getEmbeddedUrl(element));
      });
    }
    values.images.forEach((img, i) => {
      if (img.src) bodyFormData.append(`Images[${i + 1}]`, img?.src?.file);
    });
    if (venueId) {
      VenueServices.editVenue(venueId, bodyFormData).then((res) => {
        setShowLoader(null);
        if (!res.isAxiosError) {
          toast.success(translations.VenueUpdated, {
            onClose: () => navigate("/manageVenues"),
            autoClose: 2000,
          });
        } else {
          if (res.response.status === 400 && res?.response?.data) {
            const errorArr =
              Object.keys(res?.response?.data)?.length > 0
                ? Object.keys(res.response.data).map(
                    (item) => res.response.data[item]
                  )
                : null;
            setErrors({ ...errors, apiError: errorArr });
          }
        }
      });
    } else {
      VenueServices.addVenue(bodyFormData).then((res) => {
        setShowLoader(null);
        if (!res.isAxiosError) {
          toast.info(translations.VenueAdded, {
            onClose: () => navigate("/manageVenues"),
            autoClose: 2000,
          });
        } else {
          if (res.response.status === 400 && res?.response?.data) {
            const errorArr =
              Object.keys(res?.response?.data)?.length > 0
                ? Object.keys(res.response.data).map(
                    (item) => res.response.data[item]
                  )
                : null;
            setErrors({ ...errors, apiError: errorArr });
          }
        }
      });
    }
  };
  const getEmbeddedUrl = (url) => {
    if (url?.indexOf("youtu") !== -1) {
      const regExp =
        /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
      const match = url?.match(regExp);
      const videoId = match && match[2].length === 11 ? match[2] : null;
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } else if (url?.indexOf("vimeo") !== -1) {
      const regExp = /vimeo.*(?:\/|clip_id=)([0-9a-z]*)/i;
      const match = regExp.exec(url);
      const videoId = match ? match[1] : null;
      return videoId ? `https://player.vimeo.com/video/${videoId}` : url;
    } else return "";
  };
  const handleAttachment = (files, from) => {
    imagesObj = { ...values };
    if (files) {
      count = files.length;
      setErrors({ ...errors, [from]: null });
      if (from === "images") {
        if (files.length + values.images?.length > numberOfImages) {
          setErrors({
            ...errors,
            [from]: `${new IntlMessageFormat(
              translations.imageCountExceed,
              userLanguageData.language
            ).format({
              number: numberOfImages,
            })}`,
          });
          return;
        }
        files.forEach((file, i) => {
          let image = new Image();
          image.src = file.src.base64;
          image.onload = function () {
            count--;
            if (this.height < imgMinHeight || this.width < imgMinWidth) {
              setErrors({
                ...errors,
                [from]: `${new IntlMessageFormat(
                  translations.imgDimensionError,
                  userLanguageData.language
                ).format({
                  minHeight: imgMinHeight,
                  minWidth: imgMinWidth,
                })}`,
              });
            } else {
              imagesObj = { ...imagesObj, [from]: [file, ...imagesObj.images] };
            }
            if (count === 0) {
              setValues({ ...imagesObj });
            }
          };
        });
      } else setValues({ ...values, [from]: files[0] });
    }
  };
  const handleAttachmentError = (errors, from) => {
    if (errors[0].type === "unsupportedFileType") {
      setErrors({ ...errors, [from]: translations.only_jpeg_jpg_and_png });
    } else if (
      errors[0].type === "maxSizeExceeded" ||
      errors[0].type === "multipleMaxSizeExceeded"
    ) {
      setErrors({
        ...errors,
        [from]: `${new IntlMessageFormat(
          translations.image_size_should_not,
          userLanguageData.language
        ).format({
          size: maxFileSize,
        })}`,
      });
    } else if (errors[0].type === "multipleMaxCountExceeded") {
      setErrors({
        ...errors,
        [from]: `${new IntlMessageFormat(
          translations.imageCountExceed,
          userLanguageData.language
        ).format({
          number: numberOfImages,
        })}`,
      });
    } else {
      setErrors({ ...errors, [from]: translations.SomethingWentWrong });
    }
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
  const deleteImage = (index = null, image = null) => {
    // if(!index && !image){
    //   if(!values.contact_image?.src){
    //     VenueServices.deleteVenueImage(values.contact_image.id).then(() => {
    //     });
    //   }
    //   setValues({ ...values, contact_image: null });
    //   return;
    // }
    if (image?.image_path) {
      VenueServices.deleteVenueImage(image.id).then(() => {});
    }
    const picturesArr = [...values.images];
    picturesArr.splice(index, 1);
    setValues({ ...values, images: picturesArr });
  };
  const handleDynamicFieldChange = ({ target }, index) => {
    const value = target.value;
    const { name } = target;
    let data = [...values[name]];
    data[index] = value;
    setValues({ ...values, [name]: data });
  };
  const removeFields = (from, index) => {
    let data = [...values[from]];
    data.splice(index, 1);
    setValues({ ...values, [from]: data });
  };
  //function to convert img url to base64
  // async function fetchData() {
  //     let url = "http://test.event-venue.dk/uploads/thumbs/1659439228.jpg";
  //     let imgExt = url.split(/[#?]/)[0].split(".").pop().trim();
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const file = new File([blob], "profileImage." + imgExt, {
  //         type: blob.type,
  //     });
  //     let reader = new FileReader();
  //     reader.readAsDataURL(file);
  //     reader.onload = function (data) {
  //         // data.srcElement.result
  //     };
  // }
  return (
    <>
      {showPageLoader ? (
        <Pageloader />
      ) : (
        <div className="add-venue-view">
          <div className="title-block">
            <div className="title">
              {venueId ? translations.EditYourVenue : translations.AddVenue}
            </div>
            {venueId && (
              <div className="button-block">
                <Button
                  label={translations.DeleteVenue}
                  onClick={() => {
                    setShowModal(true);
                  }}
                  className="small-btn delete-btn"
                  showBtnLoader={showLoader === "delete"}
                />
                <Button
                  label={translations.SeeVenue}
                  onClick={() => {
                    navigate(`/venue/${venueId}`);
                  }}
                  className="small-btn m-0"
                />
              </div>
            )}
          </div>
          <div className="text-block">
            <div>
              <span className="fw-600"> {translations.ReasonsToBeCareful}</span>
              <ul>
                <li>{translations.ReasonsToBeCareful_1}</li>
                <li>{translations.ReasonsToBeCareful_2}</li>
                <li>{translations.ReasonsToBeCareful_3}</li>
              </ul>
            </div>
          </div>
          <div className="form-block">
            <div className="form-nav">
              {navLinks?.map((item, i) => {
                return (
                  <div
                    className="navItem"
                    onClick={(e) => {
                      setActive(i);
                    }}
                    key={i}
                  >
                    <a href={`#${i}`}>
                      <FontAwesomeIcon
                        icon={faAngleRight}
                        className="arrow-right"
                        style={{ color: active === i ? "#1796F8" : "#594A45" }}
                      />
                      <span
                        style={{ color: active === i ? "#1796F8" : "#594A45" }}
                      >
                        {item}
                      </span>
                    </a>
                  </div>
                );
              })}
            </div>

            <div className="form-wrap">
              {/* 1. Basic */}

              <div className="form-section" id="0">
                <div className="title">{translations.BasicInformation}</div>
                <Row className="form">
                  <Col xl={12} lg={12}>
                    <TextField
                      name="name"
                      label={translations.VenueName + " *"}
                      type="text"
                      onChange={handleInputChange}
                      error={errors.name}
                      value={values.name}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={4} lg={4}>
                    <TextField
                      name="street_address"
                      label={translations.Address + " *"}
                      type="text"
                      onChange={handleInputChange}
                      error={errors.street_address}
                      value={values.street_address}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={4} lg={4}>
                    <TextField
                      name="zip_code"
                      label={translations.Zipcode + " *"}
                      type="text"
                      onChange={handleInputChange}
                      error={errors.zip_code}
                      value={values.zip_code}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={4} lg={4}>
                    <TextField
                      name="city"
                      label={translations.City + " *"}
                      type="text"
                      onChange={handleInputChange}
                      error={errors.city}
                      value={values.city}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={12} lg={12}>
                    <TextArea
                      label={translations.LongDescription + " *"}
                      onChange={handleInputChange}
                      error={errors.long_description}
                      value={values.long_description}
                      className="text-field-2"
                      name="long_description"
                      rows={4}
                    />
                  </Col>
                  <Col xl={12} lg={12}>
                    <TextArea
                      name="short_description"
                      label={translations.BriefDescription + " *"}
                      onChange={handleInputChange}
                      error={errors.short_description}
                      value={values.short_description}
                      className="text-field-2"
                      rows={4}
                    />
                  </Col>
                </Row>
              </div>

              {/* 2. Contact */}

              <div className="form-section" id="1">
                <div className="title">
                  {translations.ContactInformationForInquiries}
                </div>
                <div className="d-flex">
                  <Row>
                    <Col
                      xl={2}
                      lg={6}
                      md={6}
                      sm={6}
                      className="image-block-wrap"
                    >
                      <FileUpload
                        maxSize={maxFileSize}
                        isMultiple={false}
                        onSuccess={(files) => {
                          handleAttachment(files, "contact_image");
                        }}
                        onError={(errors) =>
                          handleAttachmentError(errors, "contact_image")
                        }
                      >
                        {({ browseFiles }) => (
                          <div
                            className="image-block"
                            onClick={browseFiles}
                            style={{
                              backgroundImage: values.contact_image?.src
                                ? `url(${values.contact_image?.src?.base64})`
                                : values.contact_image?.image_path
                                ? `url(${values.contact_image?.image_path})`
                                : `url(${personImage})`,
                            }}
                          >
                            {
                              //      values.contact_image?
                              //     <img
                              //   alt=""
                              //   src={trashIconWhite}
                              //   className="delete-icon cursor-pointer"
                              //   onClick={()=>deleteImage()}
                              // />
                              // :
                              <img
                                alt=""
                                src={plusIconWhite}
                                className="plus-icon"
                              />
                            }
                          </div>
                        )}
                      </FileUpload>
                      <div className="mt-2">
                        {translations.ContactPersonPhoto}
                      </div>
                    </Col>
                    <Col
                      xl={10}
                      lg={6}
                      md={6}
                      sm={6}
                      className="contact-info-form ml-auto"
                    >
                      <Row className="form">
                        <Col xl={6} lg={6}>
                          <TextField
                            name="contact_per_name"
                            label={translations.ContactName + " *"}
                            type="text"
                            onChange={handleInputChange}
                            error={errors.contact_per_name}
                            value={values.contact_per_name}
                            className="text-field-2"
                          />
                        </Col>
                        <Col xl={6} lg={6}>
                          <TextField
                            name="company_name"
                            label={translations.Company}
                            type="text"
                            onChange={handleInputChange}
                            error={errors.company_name}
                            value={values.company_name}
                            className="text-field-2"
                          />
                        </Col>
                        <Col xl={6} lg={6}>
                          <TextField
                            name="comp_email"
                            label={translations.ContactPersonEmail + " *"}
                            type="email"
                            onChange={handleInputChange}
                            error={errors.comp_email}
                            value={values.comp_email}
                            className="text-field-2"
                          />
                        </Col>
                        <Col xl={6} lg={6}>
                          <TextField
                            name="contact_phone"
                            label={translations.ContactPersonTelephoneNumber}
                            type="tel"
                            onChange={handleInputChange}
                            error={errors.contact_phone}
                            value={values.contact_phone}
                            className="text-field-2"
                          />
                        </Col>
                        <Col xl={6} lg={6}>
                          <TextField
                            name="contact_website"
                            label={translations.VenueWebsite}
                            type="url"
                            onChange={handleInputChange}
                            error={errors.contact_website}
                            value={values.contact_website}
                            className="text-field-2"
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
              </div>

              {/* 3.Calendar */}

              <div className="form-section" id="2">
                <div className="title">{translations.CalendarIntegration}</div>
                <Row className="form">
                  {/* <Col xl={4} lg={4}>
                                    <FormDropdown options={eventTypesList} icon={eventTypeIcon} label={translations.BookingSystem} name="eventType"
                                        value={values.eventType}
                                        error={errors.eventType} onChange={handleInputChange} />
                                </Col> */}
                  <Col xl={12} lg={12}>
                    <TextField
                      name="ical"
                      placeholder="http://exempel.com/kalender.ics"
                      label={translations.IcalCalendarAddress}
                      type="url"
                      onChange={handleInputChange}
                      error={errors.ical}
                      value={values.ical}
                      className="text-field-2"
                    />
                  </Col>
                </Row>
              </div>

              {/* 4.  Capacity */}
              <div className="form-section" id="3">
                <div className="title">{translations.Capacity}</div>
                <Row className="form">
                  <Col xl={4} lg={4}>
                    <TextField
                      name="standing_capacity"
                      label={`${translations.StandingCocktail} (${translations.Max}) *`}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.standing_capacity}
                      value={values.standing_capacity}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={4} lg={4}>
                    <TextField
                      name="seating_capacity"
                      label={`${translations.SittingMealSeminar} (${translations.Max}) *`}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.seating_capacity}
                      value={values.seating_capacity}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={4} lg={4}>
                    <TextField
                      name="floorarea"
                      label={translations.FloorArea}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.floorarea}
                      value={values.floorarea}
                      className="text-field-2"
                      unit="m²"
                    />
                  </Col>
                </Row>
                <div className="sub-title">{translations.DetailedCapacity}</div>
                <div className="mb-4">{translations.DetailedCapacityDesc}</div>
                <Row className="form">
                  <Col xl={4} lg={4}>
                    <TextField
                      name="classroom"
                      label={translations.Classroom}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.classroom}
                      value={values.classroom}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={4} lg={4}>
                    <TextField
                      name="theatre"
                      label={translations.Theater}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.theatre}
                      value={values.theatre}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={4} lg={4}>
                    <TextField
                      name="banquet"
                      label={translations.Banquet}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.banquet}
                      value={values.banquet}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={4} lg={4}>
                    <TextField
                      name="conference"
                      label={translations.Conference}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.conference}
                      value={values.conference}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={4} lg={4}>
                    <TextField
                      name="ushape"
                      label={translations.UShape}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.ushape}
                      value={values.ushape}
                      className="text-field-2"
                    />
                  </Col>
                  <Col xl={12} lg={12}>
                    <TextArea
                      name="additional_cap_info"
                      label={translations.AdditionalInfoAboutCapacity}
                      onChange={handleInputChange}
                      error={errors.additional_cap_info}
                      value={values.additional_cap_info}
                      className="text-field-2"
                      rows={4}
                    />
                  </Col>
                </Row>
              </div>
              {/* 5. Venue type */}
              <div className="form-section" id="4">
                <div className="title">{translations.VenueType}</div>
                <div className="mb-4">
                  {new IntlMessageFormat(
                    translations.RoomTypeDesc,
                    userLanguageData.language
                  ).format({
                    value: 5,
                  })}
                </div>
                <Row className="form venueType-form">
                  {configs?.venue_types?.map((item, i) => {
                    return (
                      <Col xl={4} lg={4} key={i}>
                        <Checkbox
                          className="pink-checkbox mb-1"
                          label={`${item.name}`}
                          onChange={(e) => {
                            handleInputChange(e, item.id);
                          }}
                          value={values.venue_type?.indexOf(item.id) !== -1}
                          name="venue_type"
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>

              {/* 6. Services section */}

              <div className="form-section" id="5">
                <div className="title">{translations.ServicesFacilities}</div>
                <Row className="form">
                  <Col>
                    {Object.keys(services)?.map((service, i) => {
                      return (
                        <div className="service-section" key={i}>
                          <div className="sub-title">{getTitle(service)}</div>
                          <Row>
                            {services[service]?.map((item, j) => {
                              return (
                                <Col xl={4} lg={4} key={j}>
                                  <Checkbox
                                    className="pink-checkbox mb-1"
                                    label={`${item.value}`}
                                    onChange={(e) => {
                                      handleInputChange(e, item.id);
                                    }}
                                    value={
                                      values.services?.indexOf(item.id) !== -1
                                    }
                                    name="services"
                                  />
                                </Col>
                              );
                            })}
                          </Row>
                        </div>
                      );
                    })}
                  </Col>
                </Row>
              </div>

              {/* 7. Event types */}
              <div className="form-section" id="6">
                <div className="title">{translations.EventTypes}</div>
                <Row className="form venueType-form">
                  {configs?.event_types?.map((item, i) => {
                    return (
                      <Col xl={4} lg={4} key={i}>
                        <Checkbox
                          className="pink-checkbox mb-1"
                          label={`${item.name}`}
                          onChange={(e) => {
                            handleInputChange(e, item.id);
                          }}
                          value={values.event_type?.indexOf(item.id) !== -1}
                          name="event_type"
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>

              {/* 8. Activities */}
              <div className="form-section" id="7">
                <div className="title">{translations.Activities}</div>
                <Row className="form venueType-form">
                  {configs?.activities?.map((item, i) => {
                    return (
                      <Col xl={4} lg={4} key={i}>
                        <Checkbox
                          className="pink-checkbox mb-1"
                          label={`${item.name}`}
                          onChange={(e) => {
                            handleInputChange(e, item.id);
                          }}
                          value={values.activities?.indexOf(item.id) !== -1}
                          name="activities"
                        />
                      </Col>
                    );
                  })}
                </Row>
              </div>

              {/* 9. Pricing */}

              <div className="form-section" id="8">
                <div className="title">{translations.Pricing}</div>
                <div className="mb-4">{translations.PricingDesc}</div>
                <Row className="form">
                  <Col xl={3} lg={3}>
                    <TextField
                      name="price_per_person"
                      label={translations.PricePerPerson}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.price_per_person}
                      value={values.price_per_person}
                      className="text-field-2"
                      unit="$"
                    />
                  </Col>
                  <Col xl={3} lg={3}>
                    <TextField
                      name="rent_per_hour"
                      label={translations.RentPerHour}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.rent_per_hour}
                      value={values.rent_per_hour}
                      className="text-field-2"
                      unit="$"
                    />
                  </Col>
                  <Col xl={3} lg={3}>
                    <TextField
                      name="rent_per_day"
                      label={translations.RentPerDay}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.rent_per_day}
                      value={values.rent_per_day}
                      className="text-field-2"
                      unit="$"
                    />
                  </Col>
                  <Col xl={3} lg={3}>
                    <TextField
                      name="minimum_spend"
                      label={translations.SalesGuarantee}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.minimum_spend}
                      value={values.minimum_spend}
                      className="text-field-2"
                      unit="$"
                    />
                  </Col>

                  <div className="sub-title">
                    {translations.AdditionalCostsAndCancellationPolicy}
                  </div>
                  <Col xl={3} lg={3}>
                    <TextField
                      name="reservation_deposit"
                      label={translations.ReservationFee}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.reservation_deposit}
                      value={values.reservation_deposit}
                      className="text-field-2"
                      unit="$"
                    />
                  </Col>
                  <Col xl={3} lg={3}>
                    <TextField
                      name="cleaning_fee"
                      label={translations.CleaningFee}
                      type="number"
                      onChange={handleInputChange}
                      error={errors.cleaning_fee}
                      value={values.cleaning_fee}
                      className="text-field-2"
                      unit="$"
                    />
                  </Col>
                  <Col xl={12} lg={12}>
                    <TextArea
                      name="cancellation_policy"
                      label={translations.CancellationPolicy}
                      onChange={handleInputChange}
                      error={errors.cancellation_policy}
                      value={values.cancellation_policy}
                      className="text-field-2"
                      rows={4}
                    />
                  </Col>
                  <Col xl={12} lg={12}>
                    <TextArea
                      name="additional_info"
                      label={translations.AdditionalInfo}
                      onChange={handleInputChange}
                      error={errors.additional_info}
                      value={values.additional_info}
                      className="text-field-2"
                      rows={4}
                    />
                  </Col>
                </Row>
              </div>

              {/*10.  Upload photos */}

              <div className="form-section" id="9">
                <div className="title">{translations.UploadPhotosOfVenue}</div>
                <div className="mb-4 white-space-pre">
                  {translations.Instructions}
                </div>
                {values.images?.length < numberOfImages && (
                  <div>
                    <FileUpload
                      maxSize={maxFileSize}
                      multipleMaxCount={numberOfImages}
                      multipleMaxSize={maxFileSize * numberOfImages}
                      isMultiple={true}
                      onSuccess={(files) => {
                        handleAttachment(files, "images");
                      }}
                      onError={(errors) =>
                        handleAttachmentError(errors, "images")
                      }
                      error={errors.images}
                    >
                      {({ browseFiles }) => (
                        <Button
                          label={translations.UploadPhotos}
                          onClick={browseFiles}
                          className="upload-btn"
                          icon={plusIconBlue}
                        />
                      )}
                    </FileUpload>
                  </div>
                )}
                <div className="uploadPhotos-wrap">
                  {values.images?.map((image, i) => {
                    return (
                      <div className="position-relative mb-3" key={i}>
                        <img
                          className="image"
                          src={
                            image.image_path_thumbnail
                              ? image.image_path_thumbnail
                              : image.src?.base64
                          }
                        />
                        {/* <div
                      className="image"
                      style={{ backgroundImage: `url(${image.image_path_thumbnail?image.image_path_thumbnail: image.src?.base64})` }}
                      key={i}
                    > */}
                        <img
                          alt=""
                          src={trashIconWhite}
                          className="delete-icon"
                          onClick={() => {
                            deleteImage(i, image);
                          }}
                        />
                        {/* </div> */}
                      </div>
                    );
                  })}
                </div>
                {errors.images && (
                  <div className="error-msg">{errors.images}</div>
                )}
              </div>

              {/* 11. 3D view */}
              <div className="form-section" id="10">
                <div className="title">{translations._3DViews}</div>
                <div className="mb-4">{translations._3DViewsDesc}</div>
                <div className="mb-3">
                  {translations._3dviewssupported}
                  <div>
                    <span className="fw-600">Unrealer:</span> {translations.eg}{" "}
                    <code>http://www.unrealer.com/listings/HZYBa3hMN2w</code>
                  </div>
                  <div>
                    <span className="fw-600">Matterport:</span>{" "}
                    {translations.eg}{" "}
                    <code>https://my.matterport.com/show/?m=iaVvzwynuzn</code>
                  </div>
                  <div>
                    <span className="fw-600">WalkInto:</span> {translations.eg}{" "}
                    <code>https://walkinto.in/tour/bkeICbC62ZZklgLRW0anW</code>
                  </div>
                  <div>
                    <span className="fw-600">Skyview / Flycam:</span>{" "}
                    {translations.eg}{" "}
                    <code>
                      https://skyview.fi/panorama/5412f085ce66bccc02b95a45
                    </code>
                  </div>
                  <div>
                    <span className="fw-600">Google Street View:</span>{" "}
                    {translations.eg}{" "}
                    <code>
                      https://www.google.com/maps/embed?pb=!4v1546505902480!...
                    </code>
                  </div>
                </div>
                <div className="label mb-2">{`${translations._3DViewUrl}`}</div>
                <Row className="form">
                  {values.tour3d?.map((link, i) => {
                    return (
                      <Col xl={12} lg={12} key={i}>
                        <div className="d-flex align-items-center mb-3">
                          <TextField
                            name="tour3d"
                            placeholder="e.g. https://www.unrealer.com/listings/abcdef"
                            label={null}
                            type="url"
                            onChange={(e) => handleDynamicFieldChange(e, i)}
                            value={link}
                            className="text-field-2 w-100 mb-0"
                          />
                          <img
                            alt=""
                            src={trashIconRed}
                            className="ml-3"
                            onClick={(e) => {
                              removeFields("tour3d", i);
                            }}
                          />
                        </div>
                      </Col>
                    );
                  })}
                </Row>
                {values.tour3d?.length < maxLinksAllowed && (
                  <div
                    className="add-more-block"
                    onClick={() => {
                      setValues({ ...values, tour3d: [...values.tour3d, ""] });
                    }}
                  >
                    <img
                      alt=""
                      src={plusIconWhite}
                      width={21}
                      height={21}
                      className="mr-3"
                    />
                    <span> {translations.Add3DView}</span>
                  </div>
                )}
                {errors.tour3d && (
                  <div className="error-msg">{errors.tour3d}</div>
                )}
              </div>
              {/* 12. Videos */}
              <div className="form-section" id="11">
                <div className="title">{translations.Videos}</div>
                <div className="label mb-2">
                  {`${translations.YoutubeVimeoUrl}`}
                </div>
                <Row className="form">
                  {values.videos?.map((link, i) => {
                    return (
                      <Col xl={12} lg={12} key={i}>
                        <div className="d-flex align-items-center mb-3">
                          <TextField
                            name="videos"
                            placeholder="e.g. https://www.youtube.com/watch?v=abcdef"
                            label={null}
                            type="url"
                            onChange={(e) => handleDynamicFieldChange(e, i)}
                            value={link}
                            className="text-field-2 w-100 mb-0"
                          />
                          <img
                            alt=""
                            src={trashIconRed}
                            className="ml-3"
                            onClick={(e) => {
                              removeFields("videos", i);
                            }}
                          />
                        </div>
                      </Col>
                    );
                  })}
                </Row>
                {values.videos?.length < maxLinksAllowed && (
                  <div
                    className="add-more-block"
                    onClick={() => {
                      setValues({ ...values, videos: [...values.videos, ""] });
                    }}
                  >
                    <img
                      alt=""
                      src={plusIconWhite}
                      width={21}
                      height={21}
                      className="mr-3"
                    />
                    <span> {translations.AddVideo}</span>
                  </div>
                )}
                {errors.videos && (
                  <div className="error-msg">{errors.videos}</div>
                )}
              </div>

              {/* 13. Invoicing */}

              <div className="form-section" id="12">
                <div className="title">
                  {translations.MoreInformationAboutInvoicing}
                </div>
                <div className="mb-4">{translations.InvoicingDetails}</div>
                <Row className="form">
                  <Col xl={12} lg={12}>
                    <TextArea
                      name="cost_center"
                      label={null}
                      onChange={handleInputChange}
                      error={errors.cost_center}
                      value={values.cost_center}
                      className="text-field-2"
                      rows={4}
                    />
                  </Col>
                </Row>
              </div>
              {submitted && Object.keys(errors)?.length > 0 && (
                <>
                  {errors.apiError ? (
                    <>
                      {errors?.apiError?.map((err, i) => (
                        <div className="error-msg fw-bold" key={i}>
                          {err}
                        </div>
                      ))}
                    </>
                  ) : (
                    <div className="error-msg mt-3 fw-bold">
                      {translations.FillRequiredFields}
                    </div>
                  )}
                </>
              )}
              <Button
                label={translations.SaveChanges}
                onClick={saveChanges}
                wrapperClass="ml-auto mt-4"
                className="form-btn upload-btn"
                icon={saveIconCircle}
                showBtnLoader={showLoader === "add"}
              />
            </div>
          </div>
        </div>
      )}
      <Modal
        text={translations.VenueDeleteConfirmation}
        showModal={showModal}
        handleClose={() => setShowModal(false)}
        btn1Text={translations.Yes}
        btn1Click={deleteVenue}
        btn2Text={translations.No}
        showBtnLoader={setShowLoader === "delete"}
      />
    </>
  );
}

export default AddVenue;
