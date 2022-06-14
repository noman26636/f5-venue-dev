import React, { useState } from 'react'

const TabsPanel = ({ child1, child2, title1, title2 }) => {
  const [tab1, setTab1] = useState(true)
  const [tab2, setTab2] = useState(false)

  const tabsHandler1 = () => {
    if (!tab1) {
      setTab1(true)
      setTab2(false)
    }
  }
  const tabsHandler2 = () => {
    if (!tab2) {
      setTab2(true)
      setTab1(false)
    }
  }
  return (
    <div>
      <div className='tabsHeader d-flex'>
        <div className='positionRelative'>
          <div
            className={`positionAbsolute top24 left5 tabBottomBorder ${tab1 ? '' : 'd-none'
              }`}
          ></div>
          <button
            onClick={tabsHandler1}
            className={`taskButtons ${tab1 ? 'selectedTask' : ''}`}
          >
            <a target='_blank' id='accept'>
              {title1}
            </a>
          </button>
        </div>
        <div className='positionRelative'>
          <div
            className={`positionAbsolute top24 left5 tabBottomBorder ${!tab1 ? '' : 'd-none'
              }`}
          ></div>
          <button
            onClick={tabsHandler2}
            className={`taskButtons ${!tab1 ? 'selectedTask' : ''}`}
          >
            <a target='_blank' id='archived'>
              {title2}
            </a>
          </button>
        </div>
      </div>
      {tab1 ? { ...child1 } : { ...child2 }}
    </div>
  )
}

export default TabsPanel
