import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ToggleBtn from '../Common/ToggleBtn';
import VenueSearch from './VenueSearch';
// import noImagePlaceholder from "../../Assets/images/no-image.png";
import { Col, Row } from 'reactstrap';
import SearchModal from './SearchModal';
import { VenueServices } from './VenueServices';
import Pageloader from '../Common/Pageloader';
import Pager from '../Common/Pagination';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faChair } from "@fortawesome/free-solid-svg-icons";
import { Constants } from '../../Configurations/Constants';
import mapboxgl from 'mapbox-gl';
import { enum_seatingOptions, enum_sortFieldOptions, enum_sortTypeOptions } from '../../Utils/indexUtils';
import RatingStars from './RatingStars';
mapboxgl.accessToken = Constants.mapboxToken;
const initialFormValues = {
    mapSearch: false,
    location: "",
    eventType: [],
    capacity: 0,
    seatingOption: 0,
    moreFilters: [],
    name: "",
    sortField: -1,
    sortType: 0,
    lat: 0,
    lng: 0
}
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
    const [pager, setPager] = useState({ current_page: 1, per_page: 20 });
    const [map, setMap] = useState(null);
    const seatingOptions = [
        { id: 0, name: translations.Seating },
        { id: 1, name: translations.Standing }
    ];
    const sortFieldOptions = [
        { id: -1, name: translations.Relevance },
        { id: 0, name: translations.Reviews },
        { id: 1, name: translations.Price },
        { id: 2, name: translations.Capacity }

    ];
    const sortTypeOptions = [
        { id: 0, name: translations.Lowest },
        { id: 1, name: translations.Highest }
    ];
    const handleInputChange = ({ target }, checkboxId = null, checkboxValue = null) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        if (name === "eventType" || name === "moreFilters") {
            const index = values[name]?.map(item => item.id).indexOf(checkboxId);
            const prevData = [...values[name]];
            if (index === -1) {
                prevData.push({ id: checkboxId, name: checkboxValue });
                setValues({
                    ...values,
                    [name]: [...prevData],
                });
            }
            else {
                prevData.splice(index, 1);
                setValues({
                    ...values,
                    [name]: [...prevData],
                });
            }
        }
        else
            setValues({
                ...values,
                [name]: value,
            });
        // debounce(searchVenues, 2000);
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
            setValues({ ...values, valuesObj })
        }
        searchVenues(valuesObj);
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [50.6, 20.22],
            zoom: 1.5,
        });
        map.on('load', (e) => {
            return;
        });
        map.on('error', (e) => {
            return;
        });
        map.on('moveend', () => {
            const { lng, lat } = map.getCenter();
            setValues({ ...values, lat: lat, lng: lng, mapSearch: true });
        });
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        setMap(map);
        return () => {
            if (map)
                map.remove();
        }
        
       
    }, []);
    // const debounce = (fn, delay) => {
    //     let timeOutId;
    //     return function (...args) {
    //         if (timeOutId) {
    //             clearTimeout(timeOutId);
    //         }
    //         timeOutId = setTimeout(() => {
    //             fn(...args);
    //         }, delay);
    //     }
    // }
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
    useEffect(() => {
        if (Number(values.sortField) !== -1) {
            searchVenues();
            setModalType(null);
        }
    }, [values.sortField, values.sortType]);
    useEffect(() => {
        searchVenues();
    }, [values.lat, values.lng]);
    useEffect(() => {
        if (!values.mapSearch) {
            setValues({ ...values, lat: null, lng: null });
        }
    }, [values.mapSearch]);
    const searchVenues = (searchParams = values, pageNumber) => {
        setModalType(null);
        setShowLoader(true);
        const searchObj = {};
        if (searchParams?.location && searchParams?.location !== null) searchObj.city = searchParams.location;
        if (searchParams?.capacity > 0) searchObj.people = [enum_seatingOptions[Number(searchParams.seatingOption)], Number(searchParams?.capacity)];
        if (searchParams?.eventType?.length > 0) searchObj.type = searchParams.eventType.map(item => item.id);
        if (searchParams?.moreFilters?.length > 0) searchObj.service = searchParams.moreFilters.map(item => item.id);
        if (values.name !== "") searchObj.name = values.name;
        if (Number(values.sortField) !== -1) searchObj.sort = [enum_sortFieldOptions[Number(searchParams.sortField)], enum_sortTypeOptions[Number(searchParams.sortType)]];
        if (values.lat && values.lng) searchObj.coordinates = [values.lat, values.lng];
        VenueServices.venueSearch(searchObj, pageNumber, pager.per_page).then(res => {
            setShowLoader(false);
            if (!res.isAxiosError) {
                setVenuesList(res?.data?.data);
                delete res.data.data;
                setPager({ ...res.data })
            }
        });
    }
    useEffect(() => {
        if (!values.mapSearch) return;

        let avgLat = 0, avgLng = 0, count = 0;
        venuesList.forEach(venue => {
            if (!(venue.latitude > 90 || venue.latitude < -90)) {
                const marker = new mapboxgl.Marker()
                    .setLngLat([venue.longitude, venue.latitude])
                    .setPopup(new mapboxgl.Popup().setHTML(
                        `
                        <div>
                            <img src=${venue.images[0].image_path_thumbnail}>
                            <div>
                                <h3 class="popup-title">${venue.name}</h3>
                                <div>${venue.street_address}</div>
                            </div>
                        </div>
                        `
                    ))
                    .addTo(map);                   
                // new mapboxgl.Marker({
                //     color: "#594A45",
                //     draggable: false,
                // }).setLngLat([venue.longitude, venue.latitude])
                //     .addTo(map);
                avgLat += venue.latitude;
                avgLng += venue.longitude;
                count++;
            }
        });
        if (count !== 0) {
            map.setCenter([avgLng / count, avgLat / count])
            setMap(map);
            setValues({ ...values, mapSearch: true });
        }
        else {
            // map.setCenter([0, 0]);
            // setMap(map);
            setValues({ ...values, mapSearch: true });
        }
    }, [venuesList, values.mapSearch])
    const enableSearchonEnter = (e) => {
        if (e.key === "Enter") {
            searchVenues();
        }
    }
    return (
        <>
            {
                showLoader && <Pageloader />
            }
            <div className='d-flex'>
                <div className='venue-list-view' onClick={(e) => { setModalType(null) }}
                    style={{ width: values.mapSearch ? '74%' : '100%' }}
                    onKeyUp={(e)=>{  if (e.key === "Enter") searchVenues();}}
                    tabIndex="0"
                >
                    <div className='heading-block'>
                        <h3>{translations.WeddingHalls}</h3>
                        <ToggleBtn value={values.mapSearch} onChange={handleInputChange} name="mapSearch" />
                    </div>
                    <VenueSearch values={values} handleSearchModal={handleSearchModal} handleSearch={searchVenues}
                        handleInputChange={handleInputChange} onKeyUp={enableSearchonEnter}
                    />
                    <Row className='venue-details-block'>
                        {
                            venuesList?.length < 1 ?
                                <div className='no-search-msg'>
                                    {translations.NoDataToShow}
                                </div> :
                                venuesList?.map((item, i) =>
                                    <Col className='venue-block' key={i} xl={3} lg={3} md={4} sm={6} xs={12} onClick={() => { navigate(`/venue/${item.id}`) }}>
                                        <div className='image-block'>
                                            {<img alt="" src={item.images[0]?.image_path_thumbnail} />}
                                        </div>
                                        <div className='venue-details'>
                                            <div className='d-flex align-items-center'>
                                                <span className='venue-name'>{item.name}</span>
                                            </div>

                                            <div className='rating-block'>
                                                <RatingStars rating={item.ratings_avg_rating} />
                                                {item.ratings?.length > 0 && <span className='reviews'>{item.ratings.length} {item.ratings?.length !== 1 ? translations.Reviews : translations.Review}</span>}
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
                                        {Boolean(item.featured) && <div className='featured-tag'>{translations.Featured}</div>}
                                    </Col>
                                )}
                    </Row>

                    <Pager total={pager.total} current={pager.current_page}
                        onChange={(current) => { setPager({ ...pager, current_page: current }); searchVenues(null, current); }} pageSize={pager.per_page} />
                </div>
                
                {/* <div className={`map-block ${values.mapSearch ? 'd-block' : 'd-none'}`} ref={mapContainerRef}>
                    <div className='map' >
                    </div>
                </div> */}
                                 <div className={`map-container ${values.mapSearch ? 'd-block' : 'd-none'}`} ref={mapContainerRef} />
                <SearchModal showModal={modalType !== null} modalType={modalType} values={values} setValues={setValues} setModalType={setModalType}
                    eventTypesList={eventTypesList} moreServicesList={moreServicesList} handleInputChange={handleInputChange}
                    seatingOptions={seatingOptions} sortFieldOptions={sortFieldOptions} sortTypeOptions={sortTypeOptions}

                />
            </div>
        </>
    );
};

export default VenueList;