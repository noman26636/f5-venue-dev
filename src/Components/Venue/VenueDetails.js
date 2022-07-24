import React, { useEffect, useRef, useState } from 'react';
import yellowStar from "../../Assets/icons/yellow-star.svg";
import { Col, Row } from 'reactstrap';
import { VenueServices } from './VenueServices';
import { useSelector } from 'react-redux';
import location from "../../Assets/icons/location1.svg";
import tick from "../../Assets/icons/yellow-tick.svg";
import TextField from '../Common/TextField';
import FormDropdown from '../Common/Dropdown';
import TextArea from '../Common/TextArea';
import Button from '../Common/Button';
import IntlMessageFormat from 'intl-messageformat';
import { useNavigate, useParams } from 'react-router-dom';
import phone from "../../Assets/icons/phone.svg";
import mail from "../../Assets/icons/mail.svg";
import Calendar from 'react-calendar';
import { toast } from 'react-toastify';
import { Constants } from '../../Configurations/Constants';
import mapboxgl from 'mapbox-gl';
import { AccountServices } from '../Signup/AccountServices';
mapboxgl.accessToken = Constants.mapboxToken;

const initialFormValues = { eventDate: "", time: "", content: "", name: "", company: "", email: "", phone: "" };
const dummyVenue = {
    //     name: "Pines Wedding Event Venue near Downtown Miami", rating: 3.5, logo: yellowStar, city: "Miami",
    //     address: "250 rue de la Montagne Montreal, QC H7D 7K9", images: [], type: "type", capacity: 100, style: "",
    //     long_description: `The main room of TribeHaus is covered with dark wood.
    // The wood has been treated with the Shou Sugi Ban technique.
    // Originating in 18th century in Japan, Shou Sugi Ban is a particularly striking method of preserving wood by charring it with fire.
    // - Display mirrors Graffiti ceiling
    // -Barm
    // - can be modify depending on the event: empty, tables, chairs, carpets, plants etc.
    // The second room of TribeHaus is called Jumanji room and is a bright pink room, filled with plants.
    // The third room is an empty white gallery space`,
    //     services: [], iCal: null, phone: 123, email: "abc"

    "venue": [
        {
            id: 2,
            user_id: 3,
            name: "Reffen209 Trial",
            street_address: "Refshalevej 209A",
            zip_code: 1432,
            city: "København K",
            long_description: "Welcome to MACHWERK at Alte Münze. We are building the future where history happened. Located in the heart of Berlin at historic Alte Münze",
            short_description: "sd",
            ical: null,
            price_per_person: "10.000",
            rent_per_hour: "20.000",
            rent_per_day: "20.000",
            minimum_spend: "5.000",
            additional_info: "Corona might affect placing of Seats",
            reservation_deposit: "12.000",
            cleaning_fee: "7.000",
            cancellation_policy: "Cancelled",
            standing_capacity: 350,
            seating_capacity: 200,
            company_id: 3,
            deleted_at: null,
            created_at: "2022-06-28T09:24:03.000000Z",
            updated_at: "2022-07-18T12:00:25.000000Z",
            latitude: 12.61323,
            longitude: 55.69079,
            status: "Enabled",
            images: [
                {
                    "id": 1,
                    "venue_id": 2,
                    image_path: "1656408243737d73a0f02e8e9f517aa3910f6da3ce57f668d8.jpg.jpg",
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z"
                },
                {
                    "id": 2,
                    "venue_id": 2,
                    "image_path": "1656408243d4672bffd5f5a7ad19000e22e150130c919db767.jpg.jpg",
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z"
                },
                {
                    "id": 3,
                    "venue_id": 2,
                    "image_path": "1656408243f98b4de3fc97cb4666b15de07f97cdb24be883c6.jpg.jpg",
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z"
                }
            ],
            "videos": [
                {
                    "id": 1,
                    "venue_id": 2,
                    "video_url": "https://www.youtube.com/watch?v=SqpBIN6VH8o",
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z"
                },
                {
                    "id": 2,
                    "venue_id": 2,
                    "video_url": "https://www.youtube.com/watch?v=SqpBIN6VH81",
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z"
                }
            ],
            "tours": [
                {
                    "id": 1,
                    "venue_id": 2,
                    url: "https://www.youtube.com/watch?v=SqpBIN6VH8o",
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z"
                }
            ],
            "capacity": {
                "id": 1,
                "venue_id": 2,
                "classroom": null,
                "theatre": null,
                "banquet": null,
                "conference": null,
                "ushape": null,
                "additional_info": null,
                "floor_area": null,
                "deleted_at": null,
                "created_at": "2022-06-28T09:24:03.000000Z",
                "updated_at": "2022-06-28T09:24:03.000000Z"
            },
            "experience": [
                {
                    "id": 1,
                    "venue_id": 2,
                    "title": "First Experience",
                    "content": "My First Experience is Experience",
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z"
                }
            ],
            "contact": {
                "id": 1,
                "venue_id": 2,
                "contacttype_id": 1,
                name: "Humayun Asghar",
                company_name: "TEO, Islamabad BAc",
                email: "humayunasghar90@gmail.com",
                phone_number: "9231354646464",
                image_path: "1656408243WIN_20211029_11_25_06_Pro.jpg.jpg",
                "website": "www.contactme.com",
                "deleted_at": null,
                "created_at": "2022-06-28T09:24:03.000000Z",
                "updated_at": "2022-06-28T09:24:03.000000Z"
            },
            "information": {
                "id": 1,
                "venue_id": 2,
                "cost_center": "Islamabad f11-markaz",
                "deleted_at": null,
                "created_at": "2022-06-28T09:24:03.000000Z",
                "updated_at": "2022-06-28T09:24:03.000000Z"
            },
            "venueet": [
                {
                    "id": 2,
                    "venue_id": 2,
                    "admin_event_types_id": 1,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z",
                    "types": {
                        "id": 1,
                        "name": "Party"
                    }
                }
            ],
            "activities": [
                {
                    "id": 1,
                    "venue_id": 2,
                    "admin_activities_id": 1,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z",
                    "activity": {
                        "id": 1,
                        "name": "Golfff,hsih"
                    }
                },
                {
                    "id": 2,
                    "venue_id": 2,
                    "admin_activities_id": 2,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z",
                    "activity": {
                        "id": 2,
                        "name": "Bowling"
                    }
                }
            ],
            "types": [
                {
                    "id": 1,
                    "venue_id": 2,
                    "admin_venue_types_id": 1,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z",
                    "venuetype": {
                        "id": 1,
                        "name": "Cafee1"
                    }
                },
                {
                    "id": 2,
                    "venue_id": 2,
                    "admin_venue_types_id": 2,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z",
                    "venuetype": {
                        "id": 2,
                        "name": "Bar"
                    }
                }
            ],
            "services": [
                {
                    "id": 1,
                    "venue_id": 2,
                    "admin_services_facilities_id": 1,
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z",
                    "admin_services_cat_id": 1,
                    "services": {
                        "id": 1,
                        "category": "Equipment",
                        "value": "Free wifi"
                    }
                },
                {
                    "id": 2,
                    "venue_id": 2,
                    "admin_services_facilities_id": 2,
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z",
                    "admin_services_cat_id": 2,
                    "services": {
                        "id": 2,
                        "category": "Technology",
                        "value": "WIFI"
                    }
                },
                {
                    "id": 3,
                    "venue_id": 2,
                    "admin_services_facilities_id": 3,
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z",
                    "admin_services_cat_id": 3,
                    "services": {
                        "id": 3,
                        "category": "In the venue",
                        "value": "Sauna"
                    }
                },
                {
                    "id": 4,
                    "venue_id": 2,
                    "admin_services_facilities_id": 4,
                    "deleted_at": null,
                    "created_at": "2022-06-28T09:24:03.000000Z",
                    "updated_at": "2022-06-28T09:24:03.000000Z",
                    "admin_services_cat_id": 4,
                    "services": {
                        "id": 4,
                        "category": "Equipment",
                        "value": "Stage"
                    }
                }
            ]
        }
    ]
}
const VenueDetails = (props) => {
    const mapContainerRef = useRef(null);
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData, searchData } = appState;
    const translations = userLanguageData.translations;
    const [venue, setVenue] = useState({});
    const [values, setValues] = useState(initialFormValues);
    const [errors, setErrors] = useState({});
    const [showLoader, setShowLoader] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showBtnLoader, setShowBtnLoader] = useState(false);
    const [map, setMap] = useState(null);
    const navigate = useNavigate();
    const params = useParams();
    const venueId = params.venueId;
    useEffect(() => {
        getVenueDetails();
        return () => {
            if (map)
                map.remove();
        }
    }, []);
    const handleInputChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
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
        if (fieldValues.time === null) {
            field.time = translations.EmptyFieldMsg;
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
        if (fieldValues.email?.trim().length === 0 || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fieldValues.email)) {
            field.email = translations.ValidEmailRequired;
            isValid = false;
        }
        if (fieldValues.phone?.trim().length === 0) {
            field.phone = translations.EmptyFieldMsg;
            isValid = false;
        }
        else if (!/^[+]*[\d -]{5,16}[\d]$/.test(fieldValues.phone)) {
            field.phone = translations.ValidPhoneRequired
            isValid = false
        }
        setErrors({
            ...field
        });
        return isValid;
    };
    const getVenueDetails = () => {
        VenueServices.getVenueDetails(venueId).then(res => {
            if (!res.isAxiosError) {
                setVenue(res.venue[0]);
                const map = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: 'mapbox://styles/mapbox/streets-v11',
                    center: [res.venue[0].longitude, res.venue[0].latitude],
                    zoom: 1.5,
                    dragPan: false,
                });
                map.on('load', (e) => {
                });
                const marker = new mapboxgl.Marker({
                    color: "#594A45",
                    draggable: false,
                }).setLngLat([res.venue[0].longitude, res.venue[0].latitude])
                    .addTo(map);
                setMap(map);
            }
        });
    }
    useEffect(() => {
        if (submitted) validate();
    }, [values]);
    const sendInquiry = () => {
        setSubmitted(true);
        if (!validate()) return;
        setShowBtnLoader(true);
        let apiObj = {
            "event_date": values.eventDate,
            "number_of_guests": "10",//
            time: values.time,
            "budget": "10000",//
            "description_of_event": values.content,
            // "user_id": "5",
            "user_name": values.name,
            "user_email": values.email,
            "company": values.company,
            "phone_number": values.phone,
            "venue_id": venueId
        }
        AccountServices.sendInquiry(apiObj).then(res => {
            setShowBtnLoader(false);
            if (!res.isAxiosError) {
                setSubmitted(false);
                toast.success(translations.InquirySent);
                setValues(initialFormValues);
            }
        });
    }
    return (
        <div className='venue-details-view'>
            <div className='venue-details-header'>
                <div className='logo' style={{ backgroundImage: `url(${venue.logo})` }}></div>
                <div className='details'>
                    <div className='name'>{venue.name}</div>
                    <div className='rating-address-block'>
                        <div className='rating-block'>
                            <span>{venue.city}        </span>
                            <span className='mx-2'>|</span>
                            <div className='rating'><img src={yellowStar} className="mx-1" /> <span> {venue.rating} </span></div>
                        </div>
                        <div className='address-block'>
                            <img src={location} className="mx-2" /><span>{venue.street_address} {venue.zip_code} {venue.city}</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <ImageSlider items={venue.images} /> */}
            <Row className='venue-details-body'>
                <Col xl={8} lg={8}>
                    <div className="details">
                        <div className='title'>
                            {translations.Details}
                        </div>
                        <div className='venue-desc'>
                            <div>
                                {translations.Seating} {translations.capacity}<span className='fw-600 ml-3'>{venue.seating_capacity}</span>
                            </div>
                            <div> {translations.Standing} {translations.capacity}  <span className='fw-600 ml-3'>{venue.standing_capacity}</span>
                            </div>
                            <div>   {translations.VenueType}  <span className='fw-600 ml-3'>{venue.type}</span>
                            </div>
                            <div>  {translations.style}    <span className='fw-600 ml-3'>{venue.style}</span>
                            </div>
                            <p>{venue.long_description}</p>
                        </div>
                    </div>
                    <div className="facilities">
                        <div className='title'>
                            {translations.AmenitiesFacilities}
                        </div>
                        <div className='facilities-list'>
                            <ul>
                                <li>Food from venue</li>
                                <li> Own food allowed</li>
                                <li> Alcohol from venue</li>
                                <li> Own alcohol allowed</li>
                                <li> Meeting catering</li>
                            </ul>
                            <ul>
                                <li> Wi-Fi</li>
                                <li>  Professional sound system</li>
                                <li>  Sound system</li>
                                <li>  Professional lighting system</li>
                                <li>  Game console</li>
                                <li>  CD / DVD player</li>
                                <li>  Microphone</li>
                                <li>  Video conferencing equipment</li>
                                <li>  Printer</li>
                                <li>  Projector / Screen</li>
                            </ul>
                            <ul>
                                <li> Wi-Fi</li>
                                <li>  Professional sound system</li>
                                <li>  Sound system</li>
                                <li>  Professional lighting system</li>
                                <li>  Game console</li>
                                <li>  CD / DVD player</li>
                                <li>  Microphone</li>
                                <li>  Video conferencing equipment</li>
                                <li>  Printer</li>
                                <li>  Projector / Screen</li>
                            </ul>
                            <ul>
                                <li> Wi-Fi</li>
                                <li>  Professional sound system</li>
                                <li>  Sound system</li>
                                <li>  Professional lighting system</li>
                                <li>  Game console</li>
                                <li>  CD / DVD player</li>
                                <li>  Microphone</li>
                                <li>  Video conferencing equipment</li>
                                <li>  Printer</li>
                                <li>  Projector / Screen</li>
                            </ul>
                            <ul>
                                <li> Wi-Fi</li>
                                <li>  Professional sound system</li>
                                <li>  Sound system</li>
                                <li>  Professional lighting system</li>
                                <li>  Game console</li>
                                <li>  CD / DVD player</li>
                                <li>  Microphone</li>
                                <li>  Video conferencing equipment</li>
                                <li>  Printer</li>
                                <li>  Projector / Screen</li>
                            </ul>
                            <ul>
                                <li> Wi-Fi</li>
                                <li>  Professional sound system</li>
                                <li>  Sound system</li>
                                <li>  Professional lighting system</li>
                                <li>  Game console</li>
                                <li>  CD / DVD player</li>
                                <li>  Microphone</li>
                                <li>  Video conferencing equipment</li>
                                <li>  Printer</li>
                                <li>  Projector / Screen</li>
                            </ul>
                        </div>
                    </div >
                </Col >
                <Col xl={4} lg={4} className="right-content">
                    <div className="calendar">
                        <Calendar
                        // tileClassName={({ activeStartDate, date, view }) => this.setClass(date)}
                        />
                    </div>
                    <div className="inquiry-block">
                        <TextField name="eventDate"
                            placeholder={translations.SelectDate}
                            type="date"
                            onChange={handleInputChange}
                            error={errors.eventDate}
                            value={values.eventDate}
                            className="text-field-2"
                        />
                        <TextField name="time"
                            placeholder={translations.SelectTime}
                            type="time"
                            onChange={handleInputChange}
                            error={errors.time}
                            value={values.time}
                            className="text-field-2"
                        />
                        <TextArea name="content"
                            placeholder={translations.InquiryDesc}
                            onChange={handleInputChange}
                            error={errors.content}
                            value={values.content}
                            className="text-field-2"
                            rows={8}
                        />
                        <TextField name="name"
                            placeholder={translations.Name}
                            type="text"
                            onChange={handleInputChange}
                            error={errors.name}
                            value={values.name}
                            className="text-field-2"
                        />
                        <TextField name="email"
                            placeholder={translations.Email}
                            type="email"
                            onChange={handleInputChange}
                            error={errors.email}
                            value={values.email}
                            className="text-field-2"
                        />
                        <TextField name="company"
                            placeholder={`${translations.Company} (${translations.Optional})`}
                            type="text"
                            onChange={handleInputChange}
                            error={errors.company}
                            value={values.company}
                            className="text-field-2"
                        />
                        <TextField name="phone"
                            placeholder={translations.PhoneNumber}
                            type="text"
                            onChange={handleInputChange}
                            error={errors.phone}
                            value={values.phone}
                            className="text-field-2"
                        />
                        <Button label={translations.SendInquiry} onClick={sendInquiry} showBtnLoader={showBtnLoader} />
                        <div className='terms-text'>
                            {new IntlMessageFormat(translations.SendInquiryTerms, userLanguageData.language).format({
                                a: chunk1 => <a className="fw-600" key={1} onClick={() => { navigate("/termsandconditions") }}> {chunk1}</a>,
                                b: chunk2 => <a key={2} className="fw-600" onClick={() => { navigate("/privacypolicy") }}> {chunk2}</a>
                            }
                            )}
                        </div>
                    </div >

                    <div className='map' ref={mapContainerRef}>

                    </div>
                    <div className="contact">
                        <div className='sub-title'>{translations.ContactInfo}</div>
                        <ul className='contact-list'>
                            <li className='list-item'>
                                <img src={phone} alt="icon" />
                                <div className='text'>{venue.contact?.phone_number}</div>
                            </li>
                            <li className='list-item'>
                                <img src={mail} alt="icon" />
                                <div className='text'>{venue.contact?.email}</div>
                            </li>
                            <li className='list-item'>
                                <img src={location} alt="icon" />
                                <div className='text'>{venue.contact?.company_name}</div>
                            </li>
                        </ul>
                    </div >
                </Col >
            </Row>
            {/* Similar venues */}
            {/* 
            <div className='featured-venue-block' >
            <div className='featured-venue-inner-block'>
                <div className='title'> {translations.FeaturedVenues}</div>
                <ItemsCarousel items={featuredVenuesList} activeIndex={activeIndex} setActiveIndex={setActiveIndex} groups={groups}>
                    <Row className='venue-details-block'>
                        {
                            featuredVenuesList.slice(activeIndex * numberOfItems, (activeIndex * numberOfItems) + numberOfItems)?.map((item, i) =>
                                <Col className='venue-block' key={i} xl={3} lg={3} md={4}>
                                    <div className='image-block'>
                                        <img src={item.image} />
                                        <img src={item.logo} className="logo" />
                                    </div>
                                    <div className='venue-details'>
                                        <div className='venue-name'>{item.name}</div>
                                        <div className='rating-block'>
                                            <span className='ratings'>  {Array.from(Array(item.rating).keys(), n => n + 1)?.map(j => <img src={yellowStar} key={j} />)}</span>
                                            <span className='reviews'>{item.reviews} {translations.Reviews}</span>
                                        </div>
                                        <div className='guests'>
                                            <img src={guestIcon} />
                                            <span className='guest-details'>{item.guests} {translations.Guests}</span>
                                        </div>
                                        <p className='description'>
                                            {item.short_description}
                                        </p>
                                    </div>
                                </Col>
                            )}
                    </Row>
                </ItemsCarousel>
            </div>
        </div >
            */}
            {/* Review and rating block */}
            {/* 
            <div className='featured-venue-block' >
            <div className='featured-venue-inner-block'>
                <div className='title'> {translations.FeaturedVenues}</div>
                <ItemsCarousel items={featuredVenuesList} activeIndex={activeIndex} setActiveIndex={setActiveIndex} groups={groups}>
                    <Row className='venue-details-block'>
                        {
                            featuredVenuesList.slice(activeIndex * numberOfItems, (activeIndex * numberOfItems) + numberOfItems)?.map((item, i) =>
                                <Col className='venue-block' key={i} xl={3} lg={3} md={4}>
                                    <div className='image-block'>
                                        <img src={item.image} />
                                        <img src={item.logo} className="logo" />
                                    </div>
                                    <div className='venue-details'>
                                        <div className='venue-name'>{item.name}</div>
                                        <div className='rating-block'>
                                            <span className='ratings'>  {Array.from(Array(item.rating).keys(), n => n + 1)?.map(j => <img src={yellowStar} key={j} />)}</span>
                                            <span className='reviews'>{item.reviews} {translations.Reviews}</span>
                                        </div>
                                        <div className='guests'>
                                            <img src={guestIcon} />
                                            <span className='guest-details'>{item.guests} {translations.Guests}</span>
                                        </div>
                                        <p className='description'>
                                            {item.short_description}
                                        </p>
                                    </div>
                                </Col>
                            )}
                    </Row>
                </ItemsCarousel>
            </div>
        </div >
            */}
        </div>
    );
};

export default VenueDetails;