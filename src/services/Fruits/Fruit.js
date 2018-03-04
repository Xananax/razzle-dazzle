import React from 'react'

export const Fruit = ({ title, rating, description }) =>
  <div>
    <h2>{ title }</h2>
    <h2>rating: { rating }/5</h2>
    <h3>{ description }</h3>
  </div>

export default Fruit