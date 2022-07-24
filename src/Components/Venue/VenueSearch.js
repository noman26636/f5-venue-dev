import React from 'react';
import locationIcon from "../../Assets/icons/location-gray.svg";
import eventTypeIcon from "../../Assets/icons/event-type.svg";
import capacityIcon from "../../Assets/icons/capacity.svg";
import locationIconBlue from "../../Assets/icons/location-blue.svg";
import eventTypeIconBlue from "../../Assets/icons/event-type-blue.svg";
import capacityIconBlue from "../../Assets/icons/capacity-blue.svg";
import searchIcon from "../../Assets/icons/search-gray.svg";
import { useSelector } from 'react-redux';

const VenueSearch = (props) => {

    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const { values, handleSearchModal, handleSearch } = props;
    const { location, eventType, capacity, moreFilters } = values;
    return (
        <div className='venue-search'>
            <div className={`search-item ${location !== "" && 'selected'}`} onClick={() => {
                handleSearchModal("location")
            }} id="location">
                <img src={location !== "" ? locationIconBlue : locationIcon} />
                <span className='search-text'>{location && location !== "" ? location : translations.Location}</span>
            </div>
            <div className={`search-item ${eventType?.length !== 0 && 'selected'}`} onClick={() => {
                handleSearchModal("eventType")
            }} id="eventType">
                <img src={eventType?.length !== 0 ? eventTypeIconBlue : eventTypeIcon} />
                <span className='search-text'>{translations.EventType}</span>
            </div>
            <div className={`search-item ${capacity !== 0 && 'selected'}`} onClick={() => {
                handleSearchModal("capacity")
            }} id="capacity">
                <img src={capacity !== 0 ? capacityIconBlue : capacityIcon} />
                <span className='search-text'>{capacity !== 0 ? capacity : translations.Capacity}</span>
            </div>
            <div className={`search-item ${moreFilters?.length !== 0 && 'selected'}`} onClick={() => {
                handleSearchModal("moreFilters")
            }} id="moreFilters">
                <span className='search-text'>{translations.More}</span>
            </div>
            <div className="search-item search-icon" onClick={() => handleSearch()}>
                <img src={searchIcon} />
            </div>
        </div>
    );
};

export default VenueSearch;