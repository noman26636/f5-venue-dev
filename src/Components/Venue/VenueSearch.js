import React from 'react';
import locationIcon from "../../Assets/icons/location-gray.svg";
import eventTypeIcon from "../../Assets/icons/event-type.svg";
import capacityIcon from "../../Assets/icons/capacity.svg";
import locationIconBlue from "../../Assets/icons/location-blue.svg";
import eventTypeIconBlue from "../../Assets/icons/event-type-blue.svg";
import capacityIconBlue from "../../Assets/icons/capacity-blue.svg";
import searchIcon from "../../Assets/icons/search.svg";
import { useSelector } from 'react-redux';
import TextField from '../Common/TextField';
import { enum_sortFieldOptions } from '../../Utils/indexUtils';
const VenueSearch = (props) => {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const { values, handleSearchModal, handleSearch, handleInputChange } = props;
    const { name, location, eventType, capacity, moreFilters, sortField, onKeyUp } = values;
    const getAllItemsName = (arr) => {
        let str = "";
        str += arr.map((item, i) => i === 0 ? item.name : ` ${item.name}`);
        return str;
    }
    return (
        <div className='venue-search'>
            <div className="search-item p-0" >
                <TextField name="name"
                    placeholder={translations.Name}
                    type="text"
                    onChange={handleInputChange}
                    value={name}
                    className="name-field"
                    icon={values.name !== "" ? eventTypeIconBlue : eventTypeIcon}
                    onKeyUp={onKeyUp}

                />
            </div>
            <div className="search-item p-0" >
                <TextField name="location"
                    placeholder={translations.Location}
                    type="text"
                    onChange={handleInputChange}
                    value={location}
                    className="name-field"
                    icon={values.location !== "" ? locationIconBlue : locationIcon}
                    onKeyUp={onKeyUp}
                />
            </div>
            <div className={`search-item ${eventType?.length !== 0 && 'selected'}`} onClick={() => {
                handleSearchModal("eventType")
            }} id="eventType">
                <img alt="" src={eventType?.length !== 0 ? eventTypeIconBlue : eventTypeIcon} />
                <span className='search-text'>{eventType?.length > 0 ? `${getAllItemsName(eventType)}` : translations.EventType}</span>
            </div>
            <div className={`search-item ${capacity !== 0 && 'selected'}`} onClick={() => {
                handleSearchModal("capacity")
            }} id="capacity">
                <img alt="" src={capacity !== 0 ? capacityIconBlue : capacityIcon} />
                <span className='search-text'>{capacity !== 0 ? capacity : translations.Capacity}</span>
            </div>
            <div className={`search-item ${moreFilters?.length !== 0 && 'selected'}`} onClick={() => {
                handleSearchModal("moreFilters")
            }} id="moreFilters">
                <span className='search-text'>{moreFilters?.length > 0 ? `${getAllItemsName(moreFilters)}` : translations.More}</span>
            </div>
            <div className="search-item search-icon" onClick={() => handleSearch()}>
                <img alt="" src={searchIcon} />
            </div>
            <div className={`search-item sort-block ${!values.mapSearch && "ml-auto"}`} onClick={() => {
                handleSearchModal("sort")
            }} id="sort">
                <span className='search-text'>{`${translations.SortBy}: ${(Number(sortField) === -1 ? translations.Relevance : enum_sortFieldOptions[sortField])}`}
                </span>
            </div>
        </div>
    );
};

export default VenueSearch;