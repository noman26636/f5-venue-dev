import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ToggleBtn from '../Common/ToggleBtn';
import VenueSearch from './VenueSearch';
import venueDummyImg from "../../Assets/images/venue-dummy-img.png";
import { Col, Row } from 'reactstrap';
import yellowStar from "../../Assets/icons/yellow-star.svg";
import heart from "../../Assets/icons/heart-white.svg";
import guestIcon from "../../Assets/icons/guests.svg";
import SearchModal from './SearchModal';
import TextField from '../Common/TextField';
import { VenueServices } from './VenueServices';
import Pageloader from '../Common/Pageloader';
import Pager from '../Common/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faChair } from "@fortawesome/free-solid-svg-icons";
import { Constants } from '../../Configurations/Constants';
import { toast } from 'react-toastify';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = Constants.mapboxToken;
const initialFormValues = {
    mapSearch: false,
    location: "",
    eventType: [],
    capacity: 0,
    seatingOption: 1,
    moreFilters: [],
}
const dummyVenues = [
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue1 Lorem ipsum dolor sit amet, consectetur adipiscing",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing Lorem ipsum dolor sit amet, consectetur adipiscing  ",
        isFavourite: false,
        isFeatured: true
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue2",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: true
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue3",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: true
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue4",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue5",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue6",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue7",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue8",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue9",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue10",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue11",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue12",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue11",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue12",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    },
    {
        image: venueDummyImg,
        logo: venueDummyImg,
        name: "Venue13",
        rating: 5,
        reviews: 500,
        guests: 300,
        short_description: "Lorem ipsum dolor sit amet, consectetur adipiscing ",
        isFavourite: false
    }
];
const VenueList = () => {
    const mapContainerRef = useRef(null);

    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData, searchData } = appState;
    const translations = userLanguageData.translations;
    const [values, setValues] = useState(initialFormValues);
    const [eventTypesList, setEventTypesList] = useState([]);
    const [moreServicesList, setMoreServicesList] = useState([]);
    const [modalType, setModalType] = useState(null);
    const [showLoader, setShowLoader] = useState(false);
    const [venuesList, setVenuesList] = useState([]);
    const [wishlist, setWishlist] = useState([]);
    const [map, setMap] = useState(null);

    const handleInputChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    const navigate = useNavigate();
    useEffect(() => {
        getSearchConfigs();
        let valuesObj = {};
        if (searchData) {
            valuesObj.eventType = searchData.eventType ? [Number(searchData.eventType)] : [];
            valuesObj.location = searchData.location ? searchData.location : "";
            valuesObj.capacity = searchData.capacity ? searchData.capacity : 0;
            valuesObj = { ...values, ...valuesObj }
            setValues(valuesObj)
        }
        searchVenues(valuesObj);
        return () => {
            if (map)
                map.remove();
        }
    }, []);
    const getSearchConfigs = () => {
        VenueServices.getConfigList().then(res => {
            if (!res.isAxiosError) {
                setEventTypesList(res.event_types);
                setMoreServicesList(res.services);
            }
        });
    }
    const handleSearchModal = (value) => {
        if (modalType !== null) {
            setModalType(null);
        }
        setTimeout(() => {
            setModalType(value);
        }, 50);
    }
    const searchVenues = (searchParams = values) => {
        setShowLoader(true);
        const searchObj = {};
        if (searchParams.location && searchParams.location !== null) searchObj.city = searchParams.location;
        if (searchParams.capacity > 0) searchObj.people = [searchParams.seatingOption === 1 ? "Seating" : "Standing", Number(searchParams.capacity)];
        if (searchParams.eventType?.length > 0) searchObj.type = searchParams.eventType;
        if (searchParams.moreFilters?.length > 0) searchObj.service = searchParams.moreFilters;
        VenueServices.venueSearch(searchObj).then(res => {
            setShowLoader(false);
            if (!res.isAxiosError) {
                setVenuesList(res.data);
            }
        });
    }
    useEffect(() => {
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [50.6, 20.22],
            zoom: 1.5,
            dragPan: false,
        });
        // const marker = new mapboxgl.Marker({
        //     color: "#594A45",
        //     draggable: false,
        // }).setLngLat([res.venue[0].longitude, res.venue[0].latitude])
        //     .addTo(map);
        map.on('move', () => {
            const { lng, lat } = map.getCenter();
            // this.setState({
            //     lng: lng.toFixed(4),
            //     lat: lat.toFixed(4),
            //     zoom: map.getZoom().toFixed(2)
            // });
        });
        setMap(map);
    }, [venuesList])
    const addVenueToWishlist = (id, venueId) => {
        VenueServices.addVenueToWishlist(id, venueId).then(res => {
            if (!res.isAxiosError) {
                toast.success(translations.Success);
            }
        });
    }
    const showWishlist = () => {
        VenueServices.showWishlist().then(res => {
            if (!res.isAxiosError) {
                setWishlist(res.data);
            }
        });
    }
    return (
        <div className='d-flex'>
            <div className='venue-list-view' onClick={(e) => { setModalType(null) }}
                style={{ width: values.mapSearch ? '74%' : '100%' }}
            >
                <div className='heading-block'>
                    <h3>{translations.WeddingHalls}</h3>
                    <ToggleBtn value={values.mapSearch} onChange={handleInputChange} name="mapSearch" />
                </div>
                <VenueSearch values={values} handleSearchModal={handleSearchModal} handleSearch={searchVenues} />
                {
                    showLoader ? <Pageloader /> :
                        <Row className='venue-details-block'>
                            {
                                venuesList.length < 1 ?
                                    <div className='no-search-msg'>
                                        {translations.NoDataToShow}
                                    </div> :
                                    venuesList?.map((item, i) =>
                                        <Col className='venue-block' key={i} xl={3} lg={3} md={4} sm={6} xs={12} onClick={() => { navigate(`/venue/${item.id}`) }}>
                                            <div className='image-block'>
                                                <img src={`${Constants.domainUrl}${item.images[0]?.image_path}`} />
                                                <img src={item.logo} className="logo" />
                                            </div>
                                            <div className='venue-details'>
                                                <div className='d-flex align-items-center'>
                                                    <span className='venue-name'>{item.name}</span>
                                                    <div className="heart-bg" style={{ background: item.isFavourite ? "#D00027" : "#C4C4C4" }}> <img src={heart} /></div>
                                                </div>
                                                <div className='rating-block'>
                                                    <span className='ratings'>  {Array.from(Array(item.rating).keys(), n => n + 1)?.map(j => <img src={yellowStar} key={j} />)}</span>
                                                    <span className='reviews'>{item.reviews} {translations.Reviews}</span>
                                                </div>
                                                <div className='d-flex'>
                                                    <div className='guests mr-3'>
                                                        <FontAwesomeIcon icon={faMale} className="icon" />
                                                        <span className='guest-details'>{item.standing_capacity}</span>
                                                    </div>
                                                    <div className='guests'>
                                                        <FontAwesomeIcon icon={faChair} className="icon" />
                                                        <span className='guest-details'>{item.seating_capacity}</span>
                                                    </div>
                                                </div>
                                                <p className='description'>
                                                    {item.short_description}
                                                </p>
                                            </div>
                                            {item.isFeatured && <div className='featured-tag'>{translations.Featured}</div>}
                                        </Col>
                                    )}
                        </Row>
                }
                <Pager total={venuesList.length} onChange={(current, pageSize) => { }} />
            </div>
            {
                <div className={`map-block ${values.mapSearch ? 'd-block' : 'd-none'}`} ref={mapContainerRef}>
                    {/* <div className='map' >
                    </div> */}
                </div>
            }
            <SearchModal showModal={modalType !== null}
                modalType={modalType}
                values={values} setValues={setValues} setModalType={setModalType} eventTypesList={eventTypesList} moreServicesList={moreServicesList}
            />

        </div>
    );
};

export default VenueList;