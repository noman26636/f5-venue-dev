import React from 'react'
const Card = props => {
  return (
    <div className={`customCard ${props.customStyles}`} style={{ height: props.cardHeight }}>
      <div className={`customCardBody ${props.customBodyStyles}`}>{props.children}</div>
    </div>
  )
}
export default Card
