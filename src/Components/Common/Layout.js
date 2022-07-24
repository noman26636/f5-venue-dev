
import React from 'react';
import Footer from './Footer';
import Header from './Header';
export default function Layout(props) {
  return (
    <div className='main-container'>
      <Header />
      <div className='main-content'>
        {props.children}
      </div>
      <Footer />
    </div>
  )
}