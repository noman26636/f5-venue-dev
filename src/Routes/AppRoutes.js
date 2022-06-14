import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Layout from '../Components/Common/Layout'
import Home from '../Components/Home/Home'
import Profile from '../Components/Profile/Profile'
import ForgotPassword from '../Components/Signup/ForgotPassword'
import Login from '../Components/Signup/Login'
import ResetPassword from '../Components/Signup/ResetPassword'
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
              <Route path='/' exact element={<Home />} />
              <Route path='/home' exact element={<Home />} />
              <Route element={<AuthWrapper />}>
                <Route path="/profile" element={<Profile />} />
              </Route>
              <Route path='*' element={<Home />} />
            </Routes>
          </Layout >
          :
          <Routes>
            {/* Non-auth routes */}
            <Route path='/' exact element={< Layout ><Home /></Layout>} />
            <Route path='/home' exact element={< Layout ><Home /></Layout>} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/forgotPassword' exact element={<ForgotPassword />} />
            <Route path='/resetPassword' exact element={<ResetPassword />} />
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
export default AppRoutes;

