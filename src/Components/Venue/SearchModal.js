import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Popover, PopoverBody } from "reactstrap";
import { seatingOptionsTypes } from '../../Utils/indexUtils';
import Button from '../Common/Button';
import Checkbox from '../Common/Checkbox';
import FormDropdown from '../Common/Dropdown';
import TextField from '../Common/TextField';
export default function SearchModal(props) {
    let { showModal, modalType, values, setValues, setModalType, eventTypesList, moreServicesList, handleInputChange, seatingOptions,
        sortFieldOptions, sortTypeOptions } = props;
    const { eventType, capacity, moreFilters, seatingOption, sortField, sortType } = values;
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;

    const getContentFor = (value) => {
        if (value === "eventType")
            return (
                <div className='search-modal-content'>
                    <h3 className='title'>{translations.EventType}</h3>
                    <div className='modal-form'>
                        {eventTypesList?.map((item, i) => {
                            return (
                                <div className='modal-form-item' key={i} >
                                    <Checkbox className="pink-checkbox" label={`${item.name}`} name="eventType"
                                        onChange={(e) => { handleInputChange(e, item.id, item.name) }} value={(eventType?.map(item => item.id).indexOf(item.id) !== -1)} />
                                </div>
                            )
                        })}
                    </div>
                </div >
            )
        else if (value === "capacity")
            return (
                <div className='search-modal-content'>
                    <h3 className='title'>{translations.Capacity}</h3>
                    <div className='modal-form'>
                        <div className='modal-form-item mb-0'>
                            <TextField name="capacity"
                                placeholder={translations.NoOfPeople}
                                type="number"
                                onChange={handleInputChange}
                                value={capacity} min={1} max={25000}
                            />
                        </div>
                        <div className='modal-form-item mb-0'>
                            <FormDropdown options={seatingOptions} name="seatingOption" value={seatingOption}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                </div>

            )
        else if (value === "moreFilters")
            return (
                <div className='search-modal-content'>
                    <h3 className='title'>{translations.More}</h3>
                    <div className='modal-form'>
                        {moreServicesList?.map((item, i) => {
                            return (
                                <div className='modal-form-item' key={i} >
                                    <Checkbox className="pink-checkbox" label={`${item.value}`}
                                        onChange={(e) => handleInputChange(e, item.id, item.value)} name="moreFilters"
                                        value={(moreFilters?.map(item => item.id).indexOf(item.id) !== -1)} />
                                </div>
                            )
                        })}
                    </div>
                </div >
            )
        else if (value === "sort")
            return (
                <div className='search-modal-content'>
                    <h3 className='title'>{translations.SortBy}</h3>
                    <div className='modal-form'>
                        <div className='modal-form-item mb-0'>
                            <FormDropdown options={sortFieldOptions} name="sortField" value={sortField}
                                onChange={handleInputChange} />
                        </div>
                        <div className='modal-form-item mb-0'>
                            <FormDropdown options={sortTypeOptions} name="sortType" value={sortType}
                                onChange={handleInputChange} />
                        </div>
                    </div>
                </div>

            )
    }
    const handleClearBtnClick = () => {
        let valuesObj = { ...values };
        if (modalType === "eventType") {
            valuesObj = { ...values, eventType: [] };
        }
        else if (modalType === "capacity") {
            valuesObj = { ...values, capacity: 0 };
        }
        else if (modalType === "moreFilters") {
            valuesObj = { ...values, moreFilters: [] };
        }
        setValues({ ...valuesObj });
    }
    return (
        <>
            {
                (modalType && document.getElementById(modalType)) &&
                <Popover hideArrow={false} flip placement="bottom" isOpen={showModal} target={modalType}
                    className={`search-modal event-type-modal`}
                    offset={[80, 8]}
                >
                    <PopoverBody>
                        {getContentFor(modalType)}
                        {modalType !== "sort" &&
                            <div>
                                <Button className="clear-btn" label={translations.Clear} onClick={handleClearBtnClick} wrapperClass="ml-auto"
                                />
                            </div>
                        }
                    </PopoverBody>
                </Popover>
            }
        </>
    );
};