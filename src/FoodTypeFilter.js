import React from 'react';

const FoodTypeFilter = ({ filter, number, onClick, highlighted }) => {
  return (
    <a style={{ display: 'block', color: highlighted ? '#ed5565' : false }} onClick={() => onClick(filter)}>
      {filter} ({number})
    </a>
  )
}

export default FoodTypeFilter
