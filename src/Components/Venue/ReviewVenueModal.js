import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import Button from "../Common/Button";
import TextArea from "../Common/TextArea";
import yellowStar from "../../Assets/icons/yellow-star.svg";
import unfilledStar from "../../Assets/icons/unfilledStar.svg";
export default function ReviewVenueModal(props) {
  let { values,setValues, showModal, handleClose, showBtnLoader, setShowBtnLoader,postReview } =
    props;
  const appState = useSelector((state) => {
    return state.app;
  });
  const { userLanguageData } = appState;
  const translations = userLanguageData.translations;
  return (
    <Modal
      isOpen={showModal}
      onClosed={handleClose}
      backdrop="static"
      keyboard={false}
      className="wishlist-modal review-modal"
      centered
    >
      {<ModalHeader toggle={handleClose}>{translations.RateVenue}</ModalHeader>}
      <ModalBody>
        <div className="rating-stars d-flex align-items-center  mb-3">
            {translations.RateVenue}
          <div className="starsBlock d-flex ml-3">
            {[1, 2, 3, 4, 5].map((item, i) => {
              return (
                <img
                  key={i}
                  className="star"
                  src={i + 1 <= values.rating ? yellowStar : unfilledStar}
                  width={14}
                  height={14}
                  onClick={() => {
                    setValues({ ...values, rating: i + 1 });
                  }}
                  alt=""
                />
              );
            })}
          </div>
        </div>
        <TextArea
          name="body"
          placeholder={translations.TypeReview}
          onChange={({ target }) => {
            setValues({ ...values, body: target.value });
          }}
          value={values.body}
          className="text-field-2"
          rows={4}
        />
        <Button
          label={translations.PostReview}
          onClick={postReview}
          className={`small-btn ml-auto mt-4`}
          wrapperClass="w-100"
          showBtnLoader={showBtnLoader}
          disabled={values.rating === 0 || values.body===""}
        />
      </ModalBody>
    </Modal>
  );
}
