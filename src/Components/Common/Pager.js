import React from 'react'
import { Link } from 'react-router-dom'
import selected from '../../Assets/icons/selected.svg'
import circle from '../../Assets/icons/circle.svg'

const Pager = props => {
  const { count, page, onChange } = props
  return (
    <div className={'w-100 py-2'}>
      <div className='d-flex justify-content-center' id='paginationBlock'>
        {/* <Link
          to='#'
          onClick={() => {
            handleChange('left')
          }}
        >
          <div className={`${page === 1 ? 'backArrow' : 'rightArrow'}`}>
            <img alt="" src={page === 1 ? leftArrow : leftArrowWhite} alt='ohSnap' />
          </div>
        </Link> */}
        <div className='d-flex'>
          {[...Array(count).keys()]?.map((val, key) => (
            <div key={key}>
              {val + 1 === page ? (
                <div className='px-1'>
                  <img alt="" src={selected} alt='ohSnap' />
                </div>
              ) : (
                <Link
                  to='#'
                  onClick={() => {
                    onChange(val + 1)
                  }}
                >
                  <div className='px-1'>
                    <img alt="" src={circle} alt='ohSnap' />
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
        {/* <Link
          to='#'
          onClick={() => {
            handleChange('right')
          }}
          style={{ zIndex: window.innerWidth > 768 ? 99999999 : '' }}
        >
          <div className={`${page === count ? 'backArrow' : 'rightArrow'}`}>
            <img
              src={page === count ? arrowRightBlue : arrowRight}
              alt='ohSnap'
            />
          </div>
        </Link> */}
      </div>
    </div>
  )
}

export default Pager
