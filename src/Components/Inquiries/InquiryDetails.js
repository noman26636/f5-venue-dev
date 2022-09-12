import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Card, CardHeader,Row,Col } from "reactstrap";
import { getFormattedDate } from "../../Utils/indexUtils";
import Button from "../Common/Button";
import Pageloader from "../Common/Pageloader";
import TextArea from "../Common/TextArea";
import { AccountServices } from "../Signup/AccountServices";

export default function InquiryDetails() {
  const navigate = useNavigate();
  const appState = useSelector((state) => {
    return state.app;
  });
  const authState = useSelector((state) => {
    return state.auth;
  });
  const { userLanguageData } = appState;
  const translations = userLanguageData.translations;
  const params = useParams();
  const {inquiryId,token}=params;
  const [response, setResponse] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [showBtnLoader, setShowBtnLoader] = useState(false);
  const [inquiryData, setInquiryData] = useState({});

  useEffect(() => {
    if(!authState?.user?.access_token)
    navigate(`/login?redirectUrl=inquiry/${inquiryId}/${token}`);
    else
    getInquiryDetails();
  }, []);
  const getInquiryDetails = () => {
    AccountServices.getInquiryHistory(inquiryId).then((res) => {
      setShowLoader(false);
      if (!res.isAxiosError) {
        setInquiryData(res);
      }
    });
  };
  const reply = () => {
    setShowBtnLoader(true);
    AccountServices.replyInquiry({
      token: token,
      response_email: response,
    }).then((res) => {
      setShowBtnLoader(false);
      if (!res.isAxiosError) {
        toast.success(translations.Success);
        getInquiryDetails();
      }
    });
  };
  const getInitialLetters = (name) => {
    if (name) {
      name = name.split(" ");
      return `${name[0]?.slice(0, 1)}${name[1]? name[1]?.slice(0, 1):""}`;
    }
  };
  return (
    <>
      {showLoader && <Pageloader />}
      {inquiryData.inquiry && (
          <Row className="conversation-section">
            <Col xl={3} lg={3} md={6} className="detail-bar">
              <Card
                style={{
                  width: "16rem",
                }}
              >
                <CardHeader className="card-header">
                  {translations.Details}
                </CardHeader>
                <div className="card-body">
                  <div className="event-section">
                    <div className="heading">{translations.EventDate}:</div>
                    <div>
                      <div>
                        {getFormattedDate(inquiryData.inquiry.event_date)}
                      </div>
                    </div>
                  </div>
                  <div className="venue-section">
                    <div className="heading">{translations.Venue}:</div>
                    <div className="venue-link"
                      onClick={() =>
                        navigate(`/venue/${inquiryData.inquiry?.venue_id}`)
                      }
                    >
                      {inquiryData.inquiry?.venue_name}
                    </div>
                  </div>
                  <div className="customer-section">
                    <div className="heading">{translations.Customer}:</div>
                    <div>
                      <div>{inquiryData.inquiry?.user_name}</div>
                    {inquiryData.inquiry?.company &&  <div>{inquiryData.inquiry?.company}</div>}
                      <div>
                        <span>{inquiryData.inquiry?.phone_number}</span>
                      </div>
                      <div>
                        <span>{inquiryData.inquiry?.user_email}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </Col>
            <Col xl={9} lg={9} md={6} className="conversation-bar">
              <div className="conversation">
                <div className="title">
              {inquiryData.inquiry?.company &&  <span> {inquiryData.inquiry?.company},</span> }
                  {inquiryData.inquiry?.user_name}
                </div>
                <div className="messages">
                  <div className="message-top">
                    <div className="avatar senderAvatar">
                      {getInitialLetters(inquiryData.inquiry?.user_name)}
                    </div>
                    <div className="author fw-bold">
                      {inquiryData.inquiry?.user_name}
                    </div>
                    <div className="date">
                      {getFormattedDate(inquiryData.inquiry?.created_at)}
                    </div>
                  </div>
                  <div className="message-content">
                    <p
                      dangerouslySetInnerHTML={{
                        __html: inquiryData.inquiry?.description_of_event,
                      }}
                    >
                    </p>
                  </div>
                </div>
                {inquiryData.inquiry?.response_status === "0" ? (
                  <div className="reply-block">
                    <TextArea
                      placeholder={translations.TypeYourReply}
                      onChange={(e) => {
                        setResponse(e.target.value);
                      }}
                      value={response}
                      className="text-field-2"
                      name="response"
                      rows={4}
                    />
                    <Button
                      label={translations.Reply}
                      onClick={reply}
                      className="small-btn"
                      showBtnLoader={showBtnLoader}
                      wrapperClass="ml-auto"
                    />
                  </div>
                ) : (
                    <div className="messages">
                    <div className="message-top">
                      <div className="avatar">
                        {getInitialLetters(inquiryData.inquiry_response[0]?.user_name)}
                      </div>
                      <div className="author fw-bold">
                        {inquiryData.inquiry_response[0]?.user_name}
                      </div>
                      <div className="date">
                        {getFormattedDate(inquiryData.inquiry_response[0]?.created_at)}
                      </div>
                    </div>
                    <div className="message-content">
                      <p
                        dangerouslySetInnerHTML={{
                          __html: inquiryData.inquiry_response[0]?.response_email,
                        }}
                      >
                      </p>
                    </div>
                  </div>
                )}
              </div>
              <div>
                <p className="helping-text">{translations.InquiryResponseText}</p>
              </div>
            </Col>
          </Row>
      )}
    </>
  );
}
