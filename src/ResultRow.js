import React from 'react';

const ResultRow = ({ result }) => {
  return (
    <div className="row row-eq-height p-3 text-left">
      <div className="col-3">
        <img className="rounded" src={result.image_url} height="auto" width="150" />
      </div>
      <div className="col-9">

        <div style={{height:"calc(90% / 3)"}} className="h5"><strong>{result.name}</strong></div>
        <div style={{height:"calc(90% / 3)"}} className="">
          <span className="text-warning">
            {result.stars_count}
          </span>
          <span className="text-secondary">
            &nbsp;({result.reviews_count} reviews)
          </span>
        </div>
        <div style={{height:"calc(90% / 3)"}} className="text-secondary">{result.food_type} | {result.neighborhood} | {result.price_range}</div>
      </div>

    </div>
  )
}


export default ResultRow
