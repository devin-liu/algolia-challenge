import React, { Component, Fragment } from 'react';
import logo from './logo.svg';
import './App.css';

require('dotenv').config()

const algoliasearch = require('algoliasearch');
const algoliasearchHelper = require('algoliasearch-helper');


const client = algoliasearch(process.env.REACT_APP_ALGOLIA_APP_ID, process.env.REACT_APP_ALGOLIA_API_KEY);
const helper = algoliasearchHelper(client, process.env.REACT_APP_ALGOLIA_INDEX_NAME, {
  facets: ['food_type']
});


const cachedResults = {

}


const ResultRow = ({ result }) => {
  return (
    <div>
      {result.name}
    </div>
  )
}

const FoodTypeFilter = ({ filter, number }) => {
  return (
    <div>
      {filter} ({number})
    </div>
  )
}


const getFoodTypesFromFacets = (facets) => {
  console.log(facets)
  if(!facets.length) return []
  console.log(facets.filter(facet => facet.name === 'food_type'))
  console.log(facets.filter(facet => facet.name === 'food_type')[0])
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
        filters
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
        filters: getFoodTypesFromFacets(cachedResults[searchInput].facets),
      })
    }else{
      console.log(`fetching: ${this.state.searchInput}`)
      helper
      .setQuery(searchInput)
      .search()
    }

  }

  getResultText = () => {
    if(this.state.hits.length === 0 || !this.state.searchInput) return false
    const searchInput = this.state.searchInput;
    return (<div><Fragment><strong>{this.state.hits.length} results found </strong> in {cachedResults[searchInput].processingTimeMS / 1000} seconds</Fragment></div>)
  }
  render() {

    return (
      <div className="App">
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a className="navbar-brand col-md-2 mr-0" href="#">Algolia Challenge</a>
          <input
            className="form-control form-control-dark w-100"
            type="text"
            placeholder="Search"
            value={this.state.searchInput}
            onChange={this.handleChange}
            aria-label="Search"/>
        </nav>
        <div className="container-fluid">
          <div className="row">
            <nav className="col-md-2 d-none d-md-block bg-light sidebar">
              <div className="sidebar-sticky">
                {Object.keys(this.state.filters).map(filter => {
                  const number = this.state.filters[filter]
                  return (<FoodTypeFilter
                    key={`filter-${filter}`}
                    filter={filter}
                    number={number} />)
                })
                }
              </div>
            </nav>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">


              {this.getResultText()}

              {this.state.hits.map(result => <ResultRow key={`${result.objectID}`} result={result}/>)}
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
