import React from "react";
import { useSelector } from "react-redux";
import {
  Route,
  Routes,
} from "react-router-dom";
import Layout from "../Components/Common/Layout";
import Home from "../Components/Home/Home";
import ForgotPassword from "../Components/Signup/ForgotPassword";
import Login from "../Components/Signup/Login";
import ResetPassword from "../Components/Signup/ResetPassword";
import VenueList from "../Components/Venue/VenueList";
import VenueDetails from "../Components/Venue/VenueDetails";
import ManageVenues from "../Components/Venue/ManageVenues";
import AddVenue from "../Components/Venue/AddVenue";
import AddVenueLanding from "../Components/Venue/AddVenueLanding";
import InquiriesList from "../Components/Inquiries/InquiriesList";
import Company from "../Components/Profile/Company";
import Profile from "../Components/Profile/Profile";
import WishlistDetails from "../Components/Wishlist/WishlistDetails";
import Wishlists from "../Components/Wishlist/Wishlists";
import InquiryDetails from "../Components/Inquiries/InquiryDetails";
import CMSpage from "../Components/CMS/CMSpage";
let AppRoutes = () => {
  const authState = useSelector((state) => {
    return state.auth;
  });
  return (
    <>
      {authState?.user?.access_token ? (
        <Layout>
          <Routes>
            {/* Auth routes */}
            <Route path="/" exact element={<Home />} />
            <Route path="/home" exact element={<Home />} />
            <Route path="/venueList" element={<VenueList />} />
            <Route  path="/terms" element={<CMSpage id="3"/>} />
            <Route  path="/privacy" element={<CMSpage id="2"/>} />
            <Route  path="/about" element={<CMSpage id="1"/>} />
            <Route  path="/help" element={<CMSpage id="5"/>} />
            <Route  path="/contact" element={<CMSpage id="4"/>} />
            <Route path="/venue/:venueId" element={<VenueDetails />} />
            <Route path="/addVenueForm" element={<AddVenue />} />
            <Route path="/editVenue/:venueId" element={<AddVenue />} />
            <Route path="/manageVenues" element={<ManageVenues />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/company" element={<Company />} />
            <Route path="/inquiries" element={<InquiriesList />} />
            <Route
              path="/inquiry/:inquiryId/:token"
              element={<InquiryDetails />}
            />
            <Route path="/wishlists" element={<Wishlists />} />
            <Route path="/share/:wishlistToken" element={<WishlistDetails />} />
            <Route path="/wishlist/:wishlistId" element={<WishlistDetails />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          {/* Non-auth routes */}
          <Route
            path="/"
            exact
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/home"
            exact
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/venueList"
            element={
              <Layout>
                <VenueList />
              </Layout>
            }
          />
          <Route path="/login" exact element={<Login />} />
          <Route
             path="/terms"
            element={
              <Layout>
                <CMSpage id="3"/>
              </Layout>
            }
          />
          <Route
             path="/privacy"
            element={
              <Layout>
                <CMSpage id="2"/>
              </Layout>
            }
          />
          <Route
             path="/about"
            element={
              <Layout>
                <CMSpage id="1"/>
              </Layout>
            }
          />
          <Route
             path="/help"
            element={
              <Layout>
                <CMSpage id="5"/>
              </Layout>
            }
          />
          <Route
            path="/contact"
            element={
              <Layout>
                <CMSpage id="4"/>
              </Layout>
            }
          />
          <Route path="/forgotPassword" exact element={<ForgotPassword />} />
          <Route path="/resetPassword" exact element={<ResetPassword />} />
          <Route
            path="*"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/venue/:venueId"
            element={
              <Layout>
                <VenueDetails />
              </Layout>
            }
          />
          <Route
            path="/addVenue"
            element={
              <Layout>
                <AddVenueLanding />
              </Layout>
            }
          />
          <Route
            path="/inquiry/:inquiryId/:token"
            element={<InquiryDetails />}
          />
          <Route
            path="/wishlists"
            element={
              <Layout>
                <Wishlists />
              </Layout>
            }
          />
            <Route path="/share/:wishlistToken" element={  <Layout>
                <WishlistDetails />
              </Layout>} />
          <Route
            path="/wishlist/:wishlistId"
            element={
              <Layout>
                <WishlistDetails />
              </Layout>
            }
          />
        </Routes>
      )}
    </>
  );
};
export default AppRoutes;
