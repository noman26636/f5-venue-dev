import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import PrivacyPolicy from '../Components/CMS/PrivacyPolicy'
import Terms from '../Components/CMS/Terms'
import Layout from '../Components/Common/Layout'
import Home from '../Components/Home/Home'
import ForgotPassword from '../Components/Signup/ForgotPassword'
import Login from '../Components/Signup/Login'
import ResetPassword from '../Components/Signup/ResetPassword'
import VenueList from '../Components/Venue/VenueList'
// import InquiriesList from '../Components/Inquiries/InquiriesList'
// import Company from '../Components/Profile/Company'
// import Profile from '../Components/Profile/Profile'
// import AddVenue from '../Components/Venue/AddVenue'
// import AddVenueLanding from '../Components/Venue/AddVenueLanding'
// import ManageVenues from '../Components/Venue/ManageVenues'
// import VenueDetails from '../Components/Venue/VenueDetails'
// import WishlistDetails from '../Components/Wishlist/WishlistDetails'
// import Wishlists from '../Components/Wishlist/Wishlists'
let AppRoutes = () => {
  const authState = useSelector(state => {
    return state.auth;
  });
  return (
    <>
      {
        authState?.user?.access_token ?
          < Layout >
            <Routes>
              {/* Auth routes */}
              {/* <Route element={<AuthWrapper />}> */}
              <Route path='/' exact element={<Home />} />
              <Route path='/home' exact element={<Home />} />
              <Route path="/venueList" element={<VenueList />} />
              <Route path="/termsandconditions" element={<Terms />} />
              <Route path="/privacypolicy" element={<PrivacyPolicy />} />
              {/* <Route path="/venue/:venueId" element={<VenueDetails />} />
              <Route path="/addVenue" element={<AddVenueLanding />} />
              <Route path="/addVenueForm" element={<AddVenue />} />
              <Route path="/editVenue/:venueId" element={<AddVenue />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/manageVenues" element={<ManageVenues />} />
              <Route path="/inquiries" element={<InquiriesList />} />
              <Route path="/company" element={<Company />} />
              <Route path="/wishlists" element={<Wishlists />} />
              <Route path="/wishlist/:wishlistId" element={<WishlistDetails />} /> */}

              {/* </Route> */}
              <Route path='*' element={<Home />} />
            </Routes>
          </Layout >
          :
          <Routes>
            {/* Non-auth routes */}
            <Route path='/' exact element={< Layout ><Home /></Layout>} />
            <Route path='/home' exact element={< Layout ><Home /></Layout>} />
            <Route path="/venueList" element={< Layout ><VenueList /></Layout>} />
            <Route path='/login' exact element={<Login />} />
            <Route path="/termsandconditions" element={< Layout ><Terms /></Layout>} />
            <Route path="/privacypolicy" element={< Layout ><PrivacyPolicy /></Layout>} />
            <Route path='/forgotPassword' exact element={<ForgotPassword />} />
            <Route path='/resetPassword' exact element={<ResetPassword />} />
            <Route path='*' element={< Layout ><Home /></Layout>} />
            {/* <Route path="/venue/:venueId" element={< Layout ><VenueDetails /></Layout>} />
            <Route path="/addVenue" element={< Layout ><AddVenueLanding /></Layout>} />
            <Route path="/addVenueForm" element={< Layout ><AddVenue /></Layout>} />
            <Route path="/wishlists" element={< Layout ><Wishlists /></Layout>} />
            <Route path="/wishlist/:wishlistId" element={< Layout ><WishlistDetails /></Layout>} /> */}
          </Routes>
      }
    </>
  )
}
const AuthWrapper = () => {
  const authState = useSelector(state => {
    return state.auth;
  });
  return authState?.user?.access_token
    ? <Navigate to="/home" replace />
    : <Outlet />
};
const CommonRoutes = () => {
  return (
    <></>
  )
}
export default AppRoutes;

