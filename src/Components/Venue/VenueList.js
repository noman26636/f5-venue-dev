import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ToggleBtn from "../Common/ToggleBtn";
import VenueSearch from "./VenueSearch";
import { Col, Row } from "reactstrap";
import SearchModal from "./SearchModal";
import { VenueServices } from "./VenueServices";
import Pageloader from "../Common/Pageloader";
import Pager from "../Common/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMale, faChair } from "@fortawesome/free-solid-svg-icons";
import { Constants } from "../../Configurations/Constants";
import * as TYPES from "../../Store/actions/types";
import L from "leaflet";
import {
  enum_seatingOptions,
  enum_sortFieldOptions,
  enum_sortTypeOptions,
} from "../../Utils/indexUtils";
import RatingStars from "./RatingStars";
let markerGroup=null;
const mapInitialLat=55,mapInitialLng=9.18,zoom=3;
const initialFormValues = {
  mapSearch: true,
  location: "",
  eventType: [],
  capacity: 0,
  seatingOption: 0,
  moreFilters: [],
  name: "",
  sortField: -1,
  sortType: 0,
  lat: 0,
  lng: 0,
};
const VenueList = () => {
  const mapContainerRef = useRef(null);
  const dispatch = useDispatch();
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
  const [pager, setPager] = useState({ current_page: 1, per_page: 16 });
  const [map, setMap] = useState(null);
  const seatingOptions = [
    { id: 0, name: translations.Seating },
    { id: 1, name: translations.Standing },
  ];
  const sortFieldOptions = [
    { id: -1, name: translations.Relevance },
    { id: 0, name: translations.Reviews },
    { id: 1, name: translations.Price },
    { id: 2, name: translations.Capacity },
  ];
  const sortTypeOptions = [
    { id: 0, name: translations.Lowest },
    { id: 1, name: translations.Highest },
  ];
  const handleInputChange = (
    { target },
    checkboxId = null,
    checkboxValue = null
  ) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    if (name === "eventType" || name === "moreFilters") {
      const index = values[name]?.map((item) => item.id).indexOf(checkboxId);
      const prevData = [...values[name]];
      if (index === -1) {
        prevData.push({ id: checkboxId, name: checkboxValue });
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
    } else {
      const valuesObj = { ...values, [name]: value };
      if (name === "mapSearch" && !value) {
        valuesObj.lat = null;
        valuesObj.lng = null;
      }
      setValues({ ...valuesObj });
      if (name === "sortField" || name === "sortType") {
        searchVenues();
        setModalType(null);
      }
    }
  };
  useEffect(() => {
    if(values.mapSearch)
    setMarkersOnMap(venuesList);
  }, [venuesList, values.mapSearch]);
  const setMarkersOnMap = (venues) => {
    if (!values.mapSearch || !venues ||  venues?.length<1) return;
    let count = 0;
      const latLngArr = [];
      if (!map) return;
      if(markerGroup && map.hasLayer(markerGroup)){
        map.removeLayer(markerGroup);
      }
     markerGroup = L.layerGroup().addTo(map);
    venues.forEach((venue) => {
       if (!(venue.latitude > 90 || venue.latitude < -90)) {
   const marker =  L.marker([venue.longitude,venue.latitude]).addTo(markerGroup);
      
                marker.bindPopup( `
                <div>
                    <img src=${venue.images?.length>0? venue.images[0].image_path_thumbnail:null} class="popup-img">
                    <div>
                        <h3 class="popup-title">${venue.name}</h3>
                        <div>${venue.street_address}</div>
                    </div>
                </div>`);
                latLngArr.push([venue.latitude, venue.longitude]);
                count++;
      }
    });
    if (count !== 0) {
map.addLayer(markerGroup);
let avgLat=0,avgLng=0;
for (let index = 0; index < latLngArr; index++) {
 avgLat+=latLngArr[index][0];
 avgLng+=latLngArr[index][1];

}
// map.panTo([avgLat/count, avgLng/count], zoom);

 map.fitBounds(latLngArr);
    } 
    setValues({ ...values, mapSearch: true });
  };
  const searchVenues = (searchParams = values, pageNumber) => {
    setModalType(null);
    setShowLoader(true);
    const searchObj = {};
    if (searchParams) {
      if (searchParams.location && searchParams.location !== null)
        searchObj.city = searchParams.location;
      if (searchParams.capacity > 0)
        searchObj.people = [
          enum_seatingOptions[Number(searchParams.seatingOption)],
          Number(searchParams.capacity),
        ];
      if (searchParams.eventType?.length > 0)
        searchObj.type = searchParams.eventType?.map((item) =>
          Number(item.id)
        );
      if (searchParams.moreFilters?.length > 0)
        searchObj.service = searchParams.moreFilters?.map((item) => item.id);
      if (searchParams.name && searchParams.name !== "")
        searchObj.name = searchParams.name;
      if (Number(searchParams.sortField) !== -1)
        searchObj.sort = [
          enum_sortFieldOptions[Number(searchParams.sortField)],
          enum_sortTypeOptions[Number(searchParams.sortType)],
        ];
      if (searchParams.lat && searchParams.lng)
        searchObj.coordinates = [searchParams.lat, searchParams.lng];
    }
    VenueServices.venueSearch(searchObj, pageNumber, pager.per_page).then(
      (res) => {
        setShowLoader(false);
        if (!res.isAxiosError) {
          setVenuesList(res?.data);
          setPager({...pager, current_page: Number(res.page),total:res.total });
        }
      }
    );
  };
  const navigate = useNavigate();
  useEffect(() => {
    getSearchConfigs();
    let valuesObj = {};
    if (searchData) {
      valuesObj.eventType = searchData?.eventTypeObj?.id ? [searchData.eventTypeObj]    : [];
      valuesObj.location = searchData.location ? searchData.location : "";
      valuesObj.capacity = searchData.capacity? Number(searchData.capacity): 0;
      valuesObj = { ...values, ...valuesObj };
      dispatch({ type: TYPES.SEARCH_DATA, data: {} });
      setValues({ ...valuesObj });
    }
    searchVenues(valuesObj);
    const map = L.map('map').setView([mapInitialLat, mapInitialLng], zoom);
    map.on("dragend", (e) => {
        const { lng, lat } = map.getCenter();
        const valuesObj = { ...values, lat: lat, lng: lng, mapSearch: true };
        setValues({ ...valuesObj });
        if (
          valuesObj.lat &&
          valuesObj.lng &&
          valuesObj.lat !== 0 &&
          valuesObj.lng !== 0 &&
          valuesObj.mapSearch
        )
          searchVenues(valuesObj);
    });
    L.tileLayer(`https://api.mapbox.com/styles/v1/devhamo/cl7x58ru6002p14rspm04x7e3/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}`,{
      maxZoom: 22,
     minZoom:1,
      tileSize:  512,
      zoomOffset: -1, 
      accessToken: Constants.mapboxToken,
      debounceMoveend:true,
      }).addTo(map)
    setMap(map);
    return () => {
      if (map) map.remove();
    };
  }, []);
  const getSearchConfigs = () => {
    VenueServices.getConfigList().then((res) => {
      if (!res.isAxiosError) {
        setEventTypesList(res.event_types);
        setMoreServicesList(res.services);
      }
    });
  };
  const handleSearchModal = (value) => {
    if (modalType !== null) {
      setModalType(null);
    }
    setTimeout(() => {
      setModalType(value);
    }, 50);
  };
  return (
    <>
      {showLoader && <Pageloader />}
      <div className="d-flex">
        <div
          className="venue-list-view"
          onClick={(e) => {
            setModalType(null);
          }}
          style={{ width: values.mapSearch ? "74%" : "100%" }}
          onKeyUp={(e) => {
            if (e.key === "Enter") searchVenues();
          }}
          tabIndex="0"
        >
          <div className="heading-block">
            <h3>{translations.Venues}</h3>
            <ToggleBtn
              value={values.mapSearch}
              onChange={handleInputChange}
              name="mapSearch"
            />
          </div>
          <VenueSearch
            values={values}
            handleSearchModal={handleSearchModal}
            handleSearch={searchVenues}
            handleInputChange={handleInputChange}
          />
          <Row className="venue-details-block">
            {venuesList?.length < 1 ? (
              <div className="no-search-msg">{translations.NoDataToShow}</div>
            ) : (
              venuesList?.map((item, i) => (
                <Col
                  className="venue-block"
                  key={i}
                  xl={3}
                  lg={3}
                  md={4}
                  sm={6}
                  xs={12}
                  onClick={() => {
    dispatch({ type: TYPES.SEARCH_DATA, data: values });
                    navigate(`/venue/${item.id}`);
                  }}
                >
                  <div className="image-block">
                    {<img alt="" src={item.images[0]?.image_path_thumbnail} />}
                  </div>
                  <div className="venue-details">
                    <div className="d-flex align-items-center">
                      <span className="venue-name">{item.name}</span>
                    </div>

                    <div className="rating-block">
                      <RatingStars rating={item.ratings_avg_rating} />
                      {item.ratings?.length > 0 && (
                        <span className="reviews">
                          {item.ratings.length}{" "}
                          {item.ratings?.length !== 1
                            ? translations.Reviews
                            : translations.Review}
                        </span>
                      )}
                    </div>
                    <div className="d-flex">
                      <div className="guests mr-3">
                        <FontAwesomeIcon icon={faMale} className="icon" />
                        <span className="guest-details">
                          {item.standing_capacity}
                        </span>
                      </div>
                      <div className="guests">
                        <FontAwesomeIcon icon={faChair} className="icon" />
                        <span className="guest-details">
                          {item.seating_capacity}
                        </span>
                      </div>
                    </div>
                    <p className="description">{item.short_description}</p>
                  </div>
                  {Boolean(item.featured) && (
                    <div className="featured-tag">{translations.Featured}</div>
                  )}
                </Col>
              ))
            )}
          </Row>

        {
          venuesList && venuesList?.length>0 &&
          <Pager
            total={pager.total}
            current={pager.current_page}
            onChange={(current) => {
              setPager({ ...pager, current_page: current });
              searchVenues(null, current);
            }}
            pageSize={pager.per_page}
          />}
        </div>
        <div className={`map-container ${values?.mapSearch ? "d-block" : "d-none"}`}>
         <div className={`h-100`} id="map" ref={mapContainerRef} />
         </div>
        <SearchModal
          showModal={modalType !== null}
          modalType={modalType}
          values={values}
          setValues={setValues}
          setModalType={setModalType}
          eventTypesList={eventTypesList}
          moreServicesList={moreServicesList}
          handleInputChange={handleInputChange}
          seatingOptions={seatingOptions}
          sortFieldOptions={sortFieldOptions}
          sortTypeOptions={sortTypeOptions}
        />
      </div>
    </>
  );
};
export default VenueList;