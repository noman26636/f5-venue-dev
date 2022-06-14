
import React from 'react'
import Header from './Header'
export default function Layout(props) {
  return (
    <div className='main-container'>
      <Header />
      <div className='container-fluid'>
        {props.children}
      </div>
    </div>
  )
}