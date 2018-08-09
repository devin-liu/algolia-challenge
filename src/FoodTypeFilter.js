import React from 'react';

const FoodTypeFilter = ({ filter, number, onClick }) => {
  return (
    <a style={{ display: 'block' }} onClick={() => onClick(filter)}>
      {filter} ({number})
    </a>
  )
}

export default FoodTypeFilter
