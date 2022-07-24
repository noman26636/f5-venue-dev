import React, { useState } from 'react'
import sectionImg1 from "../../Assets/images/section2-img-1.png";
import sectionImg2 from "../../Assets/images/section2-img-2.png";
import sectionImg3 from "../../Assets/images/section2-img-3.png";
import location from "../../Assets/icons/location-gray.svg";
import eventTypeIcon from "../../Assets/icons/event-type.svg";
import capacity from "../../Assets/icons/capacity.svg";
import searchIcon from "../../Assets/icons/search.svg";
import { Col, Row } from 'reactstrap';
import ImageSlider from '../Common/ImageSlider';
import Button from '../Common/Button';
import FormDropdown from '../Common/Dropdown';
import TextField from '../Common/TextField';
import { useDispatch, useSelector } from 'react-redux';
import * as TYPES from '../../Store/actions/types';
import { useNavigate } from 'react-router-dom';
const initialFormValues = {
  location: "",
  eventType: 0,
  capacity: null
}
export default function Main(props) {
  const { eventTypesList } = props;
  const appState = useSelector((state) => {
    return state.app;
  });
  const { userLanguageData } = appState;
  const translations = userLanguageData.translations;
  const dispatch = useDispatch();
  const images = [sectionImg2, sectionImg1, sectionImg3];
  const [values, setValues] = useState(initialFormValues);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleInputChange = ({ target }) => {
    const value = target.type === "checkbox" ? target.checked : target.value;
    const { name } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSearch = () => {
    dispatch({ type: TYPES.SEARCH_DATA, data: values });
    navigate("/venueList");
  }

  return (
    <div className='main-section'>
      <Row className='main-section-inner'>
        <Col xl={6} lg={6} md={6} sm={12} className='text-block'>
          <div className='title-1'>
            {translations.EnjoyCeleberations}
          </div>
          <h2 className='title-2'>
            {translations.FindVenues}
          </h2>
          <div className='title-3'>
            {translations.FindSpaces}
          </div>
        </Col>
        <Col xl={6} lg={6} md={6} sm={12} className="image-block">
          <ImageSlider items={images} />
        </Col>
      </Row>
      <Row className='search-block'>
        <Col xl={3} className="search-item">
          <TextField name="location"
            icon={location} placeholder={translations.Location}
            type="text"
            onChange={handleInputChange}
            value={values.location}
            className="text-field-3"
          />
        </Col>
        <Col xl={3} className="search-item">
          <FormDropdown options={eventTypesList} icon={eventTypeIcon} label={translations.EventType} name="eventType" value={values.eventType}
            error={errors.eventType} onChange={handleInputChange} />
        </Col>
        <Col xl={3} className="search-item">
          <TextField name="capacity"
            icon={capacity} placeholder={translations.NoOfPeople}
            type="number"
            min={1} max={25000}
            onChange={handleInputChange}
            value={values.capacity}
            className="text-field-3"
          />
        </Col>
        <Col xl={3} className="search-item search-btn-block">
          <Button label={translations.SearchVenue} onClick={handleSearch} icon={searchIcon} className="search-btn" wrapperClass="w-100" />
        </Col>
      </Row>
    </div>
  )
}
