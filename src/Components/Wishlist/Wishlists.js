import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Button from "../Common/Button";
import Pageloader from "../Common/Pageloader";
import { toast } from "react-toastify";
import { VenueServices } from "../Venue/VenueServices";
import AddWishlistModal from "./AddWishlistModal";
import deleteIcon from "../../Assets/icons/deletebin.svg";
import Modal from "../Common/Modal";
import * as TYPES from "../../Store/actions/types";
const Wishlists = () => {
  const appState = useSelector((state) => {
    return state.app;
  });
  const authState = useSelector((state) => {
    return state.auth;
  });
  const { userLanguageData, wishlistData } = appState;
  const translations = userLanguageData.translations;
  const [showLoader, setShowLoader] = useState(true);
  const [showModal, setShowModal] = useState(null);
  const [wishlists, setWishlists] = useState([]);
  const [showBtnLoader, setShowBtnLoader] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (authState?.user?.access_token) getAllWishlists();
    else {
      setWishlists(wishlistData);
      setShowLoader(false);
    }
  }, []);
  const getAllWishlists = () => {
    if (!authState?.user?.access_token) return;
    VenueServices.getAllWishlists().then((res) => {
      setShowLoader(false);
      if (!res.isAxiosError) {
        setWishlists(res.wishlists);
      }
    });
  };
  const addWishlist = (data) => {
    setShowBtnLoader("add");
    VenueServices.addWishlist(data).then((res) => {
      setShowBtnLoader(null);
      if (!res.isAxiosError && res?.wishlist?.id) {
        toast.success(translations.WishlistCreated);
        getAllWishlists();
        dispatch({
          type: TYPES.WISHLIST_DATA,
          data: [...wishlistData, { ...res.wishlist, venues: [] }],
        });
        if (!authState?.user?.access_token)
          setWishlists([...wishlistData, { ...res.wishlist, venues: [] }]);
        setShowModal(null);
      }
    });
  };
  const deleteWishlist = () => {
    setShowBtnLoader("delete");
    VenueServices.deleteWishlist(itemToDelete).then((res) => {
      setShowBtnLoader(null);
      setShowModal(null);
      if (!res.isAxiosError) {
        toast.info(translations.WishlistDeleted);
        const newWishlist = wishlistData.filter(
          (wishlist) => wishlist.id !== itemToDelete
        );
        dispatch({ type: TYPES.WISHLIST_DATA, data: [...newWishlist] });
        if (!authState?.user?.access_token) setWishlists([...newWishlist]);
        getAllWishlists();
        setItemToDelete(null);
      }
    });
  };
  return (
    <>
      <div className="venue-manage-view wishlist-view-wrap">
        <div className="heading-block">
          <div>{translations.Wishlists}</div>
          <Button
            label={translations.CreateWishlist}
            onClick={() => setShowModal("add")}
            className={`small-btn add-venue-btn`}
          />
        </div>
        <div style={{paddingLeft: '20px'}}>{translations.WishlistsDesc}</div>
        {showLoader ? (
          <Pageloader />
        ) : (
          <div className="venue-manage-list wishlist-view">
            {wishlists?.map((item, i) => (
              <div
                className="venue-item"
                key={i}
                onClick={(e) => {
                  navigate(`/wishlist/${item.id}`);
                }}
              >
                <div className="top-block">
                  <div className="left-item">
                    <span className="venue-name">{item.name}</span>
                  </div>
                  <div className="right-item">
                    <img
                      alt=""
                      src={deleteIcon}
                      className="delete-icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        setItemToDelete(item.id);
                        setShowModal("delete");
                      }}
                    />
                  </div>
                </div>
                <div className="bottom-block">
                    <div className="wishlist-data">
                  <span>
                    <span className="fw-600">{item.venues?.length}</span>
                    {item.venues?.length > 1
                      ? translations.Venues
                      : translations.Venue}
                  </span>
                  <span className="separator">|</span>
                  <span>
                    {" "}
                    {translations.Created} :
                    <span className="fw-600">
                      {" "}
                      {new Date(item.created_at).toDateString()}{" "}
                    </span>
                  </span>
                  <span className="separator">|</span>
                  <span>
                    {" "}
                    {translations.Updated} :
                    <span className="fw-600">
                      {" "}
                      {new Date(item.updated_at).toDateString()}{" "}
                    </span>
                  </span>
                  </div>
                  <p className="px-2">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <AddWishlistModal
        wishlistId={null}
        showModal={showModal === "add"}
        handleClose={() => setShowModal(null)}
        addWishlist={addWishlist}
        showBtnLoader={showBtnLoader === "add"}
      />
      <Modal
        text={translations.WishlistDeleteConfirm}
        showModal={showModal === "delete"}
        handleClose={() => {
          setShowModal(null);
          setItemToDelete(null);
        }}
        btn1Text={translations.Yes}
        btn1Click={deleteWishlist}
        btn2Text={translations.No}
        showBtnLoader={showBtnLoader === "delete"}
      />
    </>
  );
};

export default Wishlists;
