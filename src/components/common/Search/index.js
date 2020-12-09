import React, {Component} from 'react';
import { API_URL } from '../../../config';
import { handleResponse } from '../../../helpers';
import{ withRouter } from 'react-router-dom';
import './index.css';


class Search extends React.Component{
    constructor() {
        super();
        this.state = {
          searchResults: [],
          searchQuery: '',
          loading: false,
        }
    }

    handleChange = event => {
        const {  value } = event.target;
        this.setState({
            loading: true
        })

        this.setState({
            searchQuery: value
        })


        fetch(`${API_URL}/autocomplete?searchQuery=${value}`)
        .then(handleResponse)
        .then(result => {
            this.setState({
                loading: false,
                searchResults: result
            })
        })

    }

    handleRedirect = id => {
        this.props.history.push(`/currency/${id}`);
        this.setState({
            searchResults:[],
            searchQuery: ''
        })
    }

    renderSearchResults () {
        const { loading , searchQuery, searchResults } = this.state;
        if(!searchQuery){
            return '';
        }

        if(searchResults.length > 0) {
            return(
                <div className="Search-result-container">
                    {
                        searchResults.map(result=>{
                            return(
                            <div
                                key={result.id}
                                className="Search-result"
                                onClick={()=>this.handleRedirect(result.id)}
                            >
                                {result.name} ({result.symbol})
                            </div>
                            )
                        })
                    }
                </div>
            )
        }
    }


    render() {
        const { loading, searchQuery } = this.state;
        // console.log(this.state)
        return (
            <div className='Search'>
                <div>
                    <span className="Search-icon" />
                    <input 
                            type="text"
                            name="search"
                            value={searchQuery}
                            placeholder="Currency name"
                            className="Search-input"
                            onChange={this.handleChange}
                    />
                </div>

                {this.renderSearchResults()}
            </div>
        )
    }
};

export default withRouter(Search);