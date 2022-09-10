<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import Pageloader from "../Common/Pageloader";
import { VenueServices } from "./VenueServices";
import { Col, Row } from "reactstrap";
import { toast } from "react-toastify";
import { getFormattedDate, venueStatus } from "../../Utils/indexUtils";
import RatingStars from "./RatingStars";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChair, faMale } from "@fortawesome/free-solid-svg-icons";
=======
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button';
import Pageloader from '../Common/Pageloader';
import { VenueServices } from './VenueServices';
import { Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { venueStatus } from '../../Utils/indexUtils';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4

const ManageVenues = () => {
  const appState = useSelector((state) => {
    return state.app;
  });
  const { userLanguageData } = appState;
  const translations = userLanguageData.translations;
  const [showLoader, setShowLoader] = useState(true);
  const [venuesList, setVenuesList] = useState([]);
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const navigate = useNavigate();
  const getUserVenues = () => {
    setShowLoader(true);
    VenueServices.getUserVenues().then((res) => {
      setShowLoader(false);
      if (!res.isAxiosError) {
        setVenuesList(res.venues);
      }
    });
<<<<<<< HEAD
  };
  const publishVenue = (id, isPublished) => {
    setShowBtnLoader(id);
    VenueServices.publishVenue(id, { is_published: !Number(isPublished) }).then(
      (res) => {
        setShowBtnLoader(null);
        if (!res.isAxiosError) {
          toast.success(translations.Success);
          getUserVenues();
        }
      }
=======
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    const [showLoader, setShowLoader] = useState(true);
    const [venuesList, setVenuesList] = useState([]);
    const [showBtnLoader, setShowBtnLoader] = useState(false);
    const navigate = useNavigate();
    const getUserVenues = () => {
        setShowLoader(true);
        VenueServices.getUserVenues().then(res => {
            setShowLoader(false);
            if (!res.isAxiosError) {
                setVenuesList(res.venues);
            }
        });
    }
    const publishVenue = (id,isPublished) => {
        setShowBtnLoader(id);
        VenueServices.publishVenue(id,{is_published:!Number(isPublished)}).then(res => {
            setShowBtnLoader(null);
            if (!res.isAxiosError) {
                toast.success(translations.Success);
                getUserVenues();   
            }
        });
    }
    useEffect(() => {
        getUserVenues();
    }, []);
    return (
        <div className='venue-manage-view' >
            <div className='heading-block'>
                <div>{translations.YourVenues}</div>
                <Button label={translations.AddVenue} onClick={() => navigate("/addVenueForm")} className={`small-btn add-venue-btn`} />
            </div>
            {
                  showLoader && <Pageloader />
            }
                    <div className='venue-manage-list'>
                        {  
                            venuesList?.length < 1 ?
                                <div className='no-search-msg'>
                                    {translations.NoDataToShow}
                                </div> :
                            venuesList?.map((item, i) =>{
                             return   <div className='venue-item' key={i}>
                                    <Row className='top-block'>
                                        <Col xl={10} lg={10} className='left-item'>
                                            <img src={item.images[0]?.image_path_thumbnail} className="logo"/>
                                            {/* <div className='logo' style={{ backgroundImage: `url(${item.images[0]?.image_path_thumbnail})` }}></div> */}
                                            <span className='venue-name'>{item.name}</span>
                                        </Col>
                                        <Col xl={2} lg={2} className='right-item'>
                                            <Button label={translations.Edit} onClick={() => { navigate(`/editVenue/${item.id}`) }} className={`small-btn`} />
                                            <Button label={translations.Preview} onClick={() => { navigate(`/venue/${item.id}`) }} className={`small-btn`} />
                                            {item.status==="Enabled" ?
                                                <Button label={ Boolean(item.is_Published) ? translations.Unpublish : translations.Publish}
                                             onClick={() => { publishVenue(item.id,Boolean(item.is_Published)) }} className={`small-btn publish-btn`}
                                                showBtnLoader={showBtnLoader===item.id}
                                            />:
                                            <Button label={ item.status}
                                            disabled className={`small-btn publish-btn`}
                                           />
                                            }
                                        </Col>
                                    </Row>
                                    <div className='bottom-block'>
                                        <p className='description'>
                                            {item.short_description}
                                        </p>
                                    </div>
                                </div>
                            }
                            )}
                    </div>
        </div>
>>>>>>> 2d9a972bec9328ea54a70b22831855f5912104e4
    );
  };
  useEffect(() => {
    getUserVenues();
  }, []);
  return (
    <div className="venue-manage-view">
      <div className="heading-block">
        <div>{translations.YourVenues}</div>
        <Button
          label={translations.AddVenue}
          onClick={() => navigate("/addVenueForm")}
          className={`small-btn add-venue-btn`}
        />
      </div>
      {showLoader && <Pageloader />}
      <div className="venue-manage-list">
        {venuesList?.length < 1 ? (
          <div className="no-search-msg">{translations.NoDataToShow}</div>
        ) : (
          venuesList?.map((item, i) => {
           return <div
              className="venue-item"
              key={i}
            >
              <Row className="flex-wrap">
                <Col xl={2} lg={2} md={2} sm={2}>
                  <img
                    alt=""
                    src={item.images[0]?.image_path_thumbnail}
                    className="venue-img"
                  />
                </Col>
                <Col
                  xl={8}
                  lg={8}
                  md={8}
                  sm={8}
                  className="venue-details"
                >
                  <div className="d-flex align-items-center">
                      <div className="name">{item.name}</div>
                      <div className="px-5">{translations.Created}: {getFormattedDate(item.created_at)}</div>
                      </div>
                  <div className="venue-info">{item.city}</div>
                  <div className="rating-block">
                    <RatingStars rating={item.ratings_avg_rating} />
                    {
                    // item.ratings_count !== 0
                    true 
                    && (
                      <span className="reviews">
                        {item.ratings_count}{" "}
                        {item.ratings_count !== 1
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
                </Col>
                <Col xl={2} lg={2} className="right-item">
                  <Button
                    label={translations.Edit}
                    onClick={() => {
                      navigate(`/editVenue/${item.id}`);
                    }}
                    className={`small-btn`}
                  />
                  <Button
                    label={translations.Preview}
                    onClick={() => {
                      navigate(`/venue/${item.id}`);
                    }}
                    className={`small-btn`}
                  />
                  {item.status === "Enabled" ? (
                    <Button
                      label={
                        Boolean(item.is_Published)
                          ? translations.Unpublish
                          : translations.Publish
                      }
                      onClick={() => {
                        publishVenue(item.id, Boolean(item.is_Published));
                      }}
                      className={`small-btn publish-btn`}
                      showBtnLoader={showBtnLoader === item.id}
                    />
                  ) : (
                    <Button
                      label={item.status}
                      disabled
                      className={`small-btn publish-btn`}
                    />
                  )}
                </Col>
              </Row>
            </div>;
          })
        )}
      </div>
    </div>
  );
};

export default ManageVenues;
