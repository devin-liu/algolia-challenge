import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

import Navbar from './Navbar.js'
import Sidebar from './Sidebar.js'
import ResultRow from './ResultRow.js'
import FoodTypeFilter from './FoodTypeFilter.js'

require('dotenv').config()

const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');


const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
const helper = algoliasearchHelper(client, process.env.REACT_APP_ALGOLIA_INDEX_NAME, {
  facets: ['food_type']
});


const cachedResults = {

}

const getFoodTypesFromFacets = (facets) => {
  if(!facets.length) return []
  return facets.filter(facet => facet.name === 'food_type')[0].data
}

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      hits: [],
      filters: {},
      searchInput: ''
    }
  }
  componentDidMount() {
    helper.on('result', (data) => {
      const { hits, query, facets } = data;
      cachedResults[query] = data;
      const filters = getFoodTypesFromFacets(facets)
      this.setState({
        hits: hits,
        filters,
        results: data
      })
    });
  }
  handleChange = (e) => {
    const searchInput = e.target.value;
    this.setState({ searchInput })
    clearTimeout(this.fetchResultsTimeout)
    this.fetchResultsTimeout = setTimeout(() => {
      this.fetchResults();
    }, 350)
  }
  fetchResults = () => {
    const searchInput = this.state.searchInput;
    if(!searchInput) return;
    if(cachedResults[searchInput]){
      this.setState({
        hits: cachedResults[searchInput].hits,
        filters: getFoodTypesFromFacets(cachedResults[searchInput].facets)
      })
    }else{
      console.log(`fetching: ${this.state.searchInput}`)
      helper
      .setQuery(searchInput)
      .search()
    }

  }

  getResultText = () => {
    if(!this.state.hits.length || !this.state.searchInput) return false
    const searchInput = this.state.searchInput;
    return (<Fragment><strong>{this.state.hits.length} results found </strong> in {this.state.results.processingTimeMS / 1000} seconds</Fragment>)
  }
  render() {

    return (
      <div className="App">
        <Navbar value={this.state.searchInput} handleChange={this.handleChange} />
        <div className="container-fluid">
          <div className="row">
          <Sidebar>
            {Object.keys(this.state.filters).map(filter => {
                const number = this.state.filters[filter]
                return (<FoodTypeFilter
                  key={`filter-${filter}`}
                  filter={filter}
                  number={number} />)
              })
            }
          </Sidebar>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
              <div className="p-3">
                {this.getResultText()}
              </div>
              {this.state.hits.map(result => <ResultRow key={`${result.objectID}`} result={result}/>)}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
