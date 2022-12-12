
import React from 'react';
import { useLocation } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  const location = useLocation();
  // if (location.pathname === "/") {
  //   return (

  //     <div className='main-content'>
  //       {props.children}
  //     </div>
  //   )
  // }
  // else {
    return (
      <div className='main-container'>
        <Header />
        <div className='main-content'>
          {props.children}
        </div>
        <Footer />
      </div>
    )
  // }

}