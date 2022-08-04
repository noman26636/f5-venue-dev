import React, { useState } from 'react'
import sImg1 from "../../Assets/images/s-img1.jpg";
import sImg2 from "../../Assets/images/s-img2.jpg";
import sImg3 from "../../Assets/images/s-img3.jpg";
import sImg4 from "../../Assets/images/s-img4.jpg";
import sImg5 from "../../Assets/images/s-img5.jpg";
import sImg6 from "../../Assets/images/s-img6.jpg";
import sImg7 from "../../Assets/images/s-img7.jpg";
import sImg8 from "../../Assets/images/s-img8.jpg";
import sImg9 from "../../Assets/images/s-img9.jpg";
import sImg10 from "../../Assets/images/s-img10.jpg";
import sImg11 from "../../Assets/images/s-img11.jpg";
import sImg12 from "../../Assets/images/s-img12.jpg";
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
  const images = [sImg1, sImg2, sImg3, sImg4, sImg5, sImg6, sImg7, sImg8, sImg9, sImg10, sImg11, sImg12];
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
