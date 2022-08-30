import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../Common/Button';
import Pageloader from '../Common/Pageloader';
import { VenueServices } from './VenueServices';
import { Col, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { venueStatus } from '../../Utils/indexUtils';

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
                            venuesList?.map((item, i) =>
                                <div className='venue-item' key={i}>
                                    <Row className='top-block'>
                                        <Col xl={10} lg={10} className='left-item'>
                                            <div className='logo' style={{ backgroundImage: `url(${item.images[0]?.image_path})` }}></div>
                                            <span className='venue-name'>{item.name}</span>
                                        </Col>
                                        <Col xl={2} lg={2} className='right-item'>
                                            <Button label={translations.Edit} onClick={() => { navigate(`/editVenue/${item.id}`) }} className={`small-btn`} />
                                            <Button label={translations.Preview} onClick={() => { navigate(`/venue/${item.id}`) }} className={`small-btn`} />
                                            <Button label={Boolean(item.is_Published) ? translations.Unpublish : translations.Publish}
                                             onClick={() => { publishVenue(item.id,Boolean(item.is_Published)) }} className={`small-btn publish-btn`}
                                                showBtnLoader={showBtnLoader===item.id}
                                            />
                                        </Col>
                                    </Row>
                                    <div className='bottom-block'>
                                        <p className='description'>
                                            {item.short_description}
                                        </p>
                                    </div>
                                </div>
                            )}
                    </div>
        </div>
    );
};

export default ManageVenues;