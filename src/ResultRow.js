import React from 'react';
import starsIcons from './stars-icons.png';

const yellowStarWidth = num => num*36.8
const greyStarWidth = num => (5-num)*36.8


const starStyle = {
  height: '35px',
  position: 'absolute'
}

const yellowStarStyle = num => {
  return {
    background: `url('${starsIcons}') 0 35px`,
    width: `${yellowStarWidth(num)}px`,
    height: '35px',
    position: 'absolute'
  }
}

const greyStarStyle = num => {
  return {
    background: `image(${starsIcons}) 0 0`,
    width: '184px',
    height: '35px',
    position: 'absolute'
  }
}

const starContainerStyle = {
  height: '35px',
  width: '184px',
  position: 'relative',
  display: 'inline-block',
  verticalAlign: 'middle'
}

const ResultRow = ({ result }) => {
  return (
    <div className="row row-eq-height p-3 mb-3 text-left" style={{background: 'white'}}>
      <div className="col-3">
        <img className="rounded" src={result.image_url} height="auto" width="150" />
      </div>
      <div className="col-9">
        <div className="h5"><strong>{result.name}</strong></div>
        <div className="h5">
          <div style={starContainerStyle}>
            <div style={greyStarStyle(result.stars_count)} />
            <div style={yellowStarStyle(result.stars_count)}/>
          </div>
          <div className="text-secondary h4" style={{display: 'inline-block'}}>
            &nbsp;({result.reviews_count} reviews)
          </div>
        </div>
        <div style={{height:"calc(90% / 3)"}} className="text-secondary">
          <p>
          {result.food_type} | {result.neighborhood} | {result.price_range}
          </p>
        </div>
      </div>

    </div>
  )
}


export default ResultRow
