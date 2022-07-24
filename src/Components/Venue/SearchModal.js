import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Popover, PopoverBody } from "reactstrap";
import Button from '../Common/Button';
import Checkbox from '../Common/Checkbox';
import FormDropdown from '../Common/Dropdown';
import TextField from '../Common/TextField';
const initialFormValues = {
    mapSearch: false,
    location: "",
    eventType: [],
    capacity: 0,
    moreFilters: [],
    seatingOption: 1
}
export default function SearchModal(props) {
    let { showModal, modalType, values, setValues, setModalType, eventTypesList, moreServicesList } = props;
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [formValues, setFormValues] = useState(values);
    const seatingOptions = [
        { id: 1, name: translations.Seating },
        { id: 2, name: translations.Standing }
    ];
    useEffect(() => {
        setFormValues(values);
    }, [modalType])
    const handleInputChange = ({ target }, checkboxValue) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        const { name } = target;
        if (name === "eventType" || name === "moreFilters") {
            const index = formValues[name]?.indexOf(checkboxValue);
            const prevData = [...formValues[name]];
            if (index === -1) {
                prevData.push(checkboxValue);
                setFormValues({
                    ...formValues,
                    [name]: [...prevData],
                });
            }
            else {
                prevData.splice(index, 1);
                setFormValues({
                    ...formValues,
                    [name]: [...prevData],
                });
            }
        }
        else
            setFormValues({
                ...formValues,
                [name]: value,
            });
    }
    const getContentFor = (value) => {
        if (value === "location")
            return (
                <div className='search-modal-content'>
                    <h3 className='title'>{translations.SelectCity}</h3>
                    <div className='modal-form'>
                        <div className='modal-form-item '>
                            <TextField name="location"
                                placeholder={translations.CityExample}
                                type="text"
                                onChange={handleInputChange}
                                value={formValues.location}
                            />
                        </div>
                        <div className='helping-text'>{translations.CityExampleText}</div>
                    </div>
                </div>
            )
        else if (value === "eventType")
            return (
                <div className='search-modal-content'>
                    <h3 className='title'>{translations.EventType}</h3>
                    <div className='modal-form'>
                        {eventTypesList?.map((item, i) => {
                            return (
                                <div className='modal-form-item' key={i} >
                                    <Checkbox className="pink-checkbox" label={`${item.name}`} onChange={(e) => { handleInputChange(e, item.id) }} value={(formValues.eventType?.indexOf(item.id) !== -1)} name="eventType" />
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
                                value={formValues.capacity} min={1} max={25000}
                            />
                        </div>
                        <div className='modal-form-item mb-0'>
                            <FormDropdown options={seatingOptions} name="seatingOption" value={formValues.seatingOption}
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
                                    <Checkbox className="pink-checkbox" label={`${item.category}`} onChange={(e) => handleInputChange(e, item.id)} value={(formValues.moreFilters?.indexOf(item.id) !== -1)} name="moreFilters" />
                                </div>
                            )
                        })}
                    </div>
                </div >

            )
    }
    const handleClearBtnClick = () => {
        let valuesObj = { ...values };
        let formValuesObj = { ...formValues };
        if (modalType === "location") {
            valuesObj = { ...values, location: "" };
            formValuesObj = { ...formValues, location: "" };
        }
        else if (modalType === "eventType") {
            valuesObj = { ...values, eventType: [] };
            formValuesObj = { ...formValues, eventType: [] };
        }
        else if (modalType === "capacity") {
            valuesObj = { ...values, capacity: 0 };
            formValuesObj = { ...formValuesObj, capacity: 0 };
        }
        else if (modalType === "moreFilters") {
            valuesObj = { ...values, moreFilters: [] };
            formValuesObj = { ...formValuesObj, moreFilters: [] };
        }
        setValues({ ...valuesObj });
        setFormValues({ ...formValuesObj });
    }
    return (
        <>
            {
                (modalType && document.getElementById(modalType)) &&
                <Popover hideArrow={false} flip placement="bottom" isOpen={showModal} target={modalType} className={`search-modal ${modalType !== "location" ? 'event-type-modal' : ""}`}
                    offset={[80, 8]}
                >
                    <PopoverBody>
                        {getContentFor(modalType)}
                        <div className='btn-block'>
                            <Button className="clear-btn" label={translations.Clear} onClick={handleClearBtnClick} />
                            <Button className="save-btn" label={translations.Save} onClick={() => { setValues(formValues); setModalType(null); }} />
                        </div>
                    </PopoverBody>
                </Popover>
            }
        </>

    );
};