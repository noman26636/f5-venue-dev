import React, { useState } from "react";
import { useSelector } from "react-redux";
import MultiselectDD from "../Common/MultiselectDD";
import TextField from "../Common/TextField";
import searchIcon from "../../Assets/icons/search.svg";
import { Table } from "reactstrap";
import { AccountServices } from "../Signup/AccountServices";
import { useEffect } from "react";
import Pageloader from "../Common/Pageloader";
import { VenueServices } from "../Venue/VenueServices";
import { getFormattedDate } from "../../Utils/indexUtils";
import { useNavigate } from "react-router-dom";
import Pager from "../Common/Pagination";
const initialFormValues = {
  venues: [],
  text: "",
};
const InquiriesList = () => {
    const navigate=useNavigate();
  const appState = useSelector((state) => {
    return state.app;
  });
  const { userLanguageData } = appState;
  const translations = userLanguageData.translations;
  const [values, setValues] = useState(initialFormValues);
  const [venuesList, setVenuesList] = useState([]);
  const [inquiresList, setInquiriesList] = useState([]);
  const [showLoader, setShowLoader] = useState(true);
  const [pager, setPager] = useState({ current_page: 1, per_page: 2 });
  const getOptions = () => {
    return venuesList?.map((item) => ({
      value: item.id,
      label: item.name,
    }));
  };
  useEffect(() => {
    getVenues();
    getInquiries();
  }, []);
  const getVenues = () => {
    setShowLoader(true);
    const searchObj = {};
    if (values.search !== "") searchObj.name = values.text;
    VenueServices.getUserVenues(searchObj).then((res) => {
      if (!res.isAxiosError) {
        setVenuesList(res?.venues);
      }
    });
  };
  const getInquiries = (pageNumber) => {
 let venuesArr=[];
    if(values.venues?.length>0)
     venuesArr  =values.venues.map(venue=>venue.value);
    AccountServices.inquiriesSearch({...values,venues:venuesArr},pageNumber, pager.per_page).then((res) => {
      setShowLoader(false);
      if (!res.isAxiosError) {
        setInquiriesList(res.inquiry);
        setPager({...pager, current_page: Number(res.page),total:res.total });
      }
    });
  };
  const handleInputChange = ({ target }) => {
    const value = target.value;
    const { name } = target;
    setValues({
      ...values,
      [name]: value,
    });
  };
  return (
    <>
      {showLoader && <Pageloader />}
      <div className="inquiries-list">
        <div className="heading-block">{translations.Inquiries}</div>
        <div className="search-block">
          <div className="search-item">
            <div className="label">{translations.Venues}</div>
            <MultiselectDD
              options={getOptions()}
              name="venues"
              value={values.venues}
              onChange={(data) => {
                setValues({ ...values, venues: data });
              }}
            />
          </div>
          <div className="search-item">
            <div className="label">{translations.Search}</div>
            <TextField
              name="text"
              type="text"
              onChange={handleInputChange}
              value={values.text}
              className="text-field-2"
            />
          </div>
          <div className="search-btn" onClick={getInquiries}>
            <img alt="" src={searchIcon} />
          </div>
        </div>
        <div className="inquiries-table">
          <Table borderless responsive>
            <thead>
              <tr className="table-light">
                <th>{translations.Status}</th>
                <th>{translations.EventDate}</th>
                <th>{translations.Sender}</th>
                <th>{translations.VenueName}</th>
                <th>{translations.InquiryDate}</th>
              </tr>
            </thead>
            <tbody>
              {inquiresList?.length > 0 ? (
                inquiresList?.map((item, i) => {
                  return (
                    <tr key={i} className="table-row" onClick={()=>navigate(`/inquiry/${item.id}/${item.token}`)}>
                      <td>{item.response_status==="0"?translations.NotReplied:translations.Replied}</td>
                      <td>{getFormattedDate(item.event_date)}</td>
                      <td>
                        <div>{item.user_name}</div>
                        <div>{item.user_email}</div>
                      {item.company &&  <div>{item.company}</div>}
                      <div>{item.phone_number}</div>
                      </td>
                      <td>{item.venue_name}</td>
                      <td>{getFormattedDate(item.created_at)}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7}>
                    <div className="text-block">
                      <div>
                        <span className="fw-600">
                          {translations.WhyDoINotSee}
                        </span>
                        <ul>
                          <li>{translations.WhyDoINotSee_1}</li>
                          <li>{translations.WhyDoINotSee_2}</li>
                        </ul>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
        <Pager
            total={pager.total}
            current={pager.current_page}
            onChange={(current) => {
              setPager({ ...pager, current_page: current });
              getInquiries(current);
            }}
            pageSize={pager.per_page}
          />
      </div>
    </>
  );
};

export default InquiriesList;
