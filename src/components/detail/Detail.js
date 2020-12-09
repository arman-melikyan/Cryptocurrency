import React, { Component } from 'react';
import { API_URL } from '../../config';
import { handleResponse, renderChangePercent } from '../../helpers';
import Loading from '../common/Loading/Loading';
import './Detail.css';

class Detail extends Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            currency: {},
            error: null
        }
    }

    fetchCurrency(currencyId) {
        this.setState({
            loading: true
        })
        fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
        .then(handleResponse)
        .then((data) => {
            // console.log(data);
            this.setState({
                loading: false,
                currency: data,
            })
        })
        .catch(error => {
            this.setState({
                loading: false,
                error: error.errorMessage
            })
        })
    }


    componentWillReceiveProps(nextProps) {
        const currencyId = nextProps.match.params.id
        this.fetchCurrency(currencyId);
    }

    componentDidMount() {
        const currencyId = this.props.match.params.id

        this.fetchCurrency(currencyId);
    }

    render() {
        const { currency: {
             marketCap, name, rank, price, symbol, totalSupply, volume24h, percentChange24h
        }, loading, error } = this.state
        if(loading) {
            return (
                <div className="loading-container">
                    <Loading />
                </div>
            )
        }

        if(error) {
            return (
                <div className='error'>
                    <h2>{error}</h2>
                </div>
            )
        }

        return(
            <div className="Detail">
                <h1 className="Detail-heading">
                    {name} ({symbol})
                </h1>
                <div className="Detail-container">
                    <div className="Detail-item">
                        <span className="Detail-title">Price </span>
                        <span className="Detail-dollar">$</span>{price}
                    </div>
                        
                    <div className="Detail-item">
                        <span className="Detail-title"> Rank </span>
                        {rank}
                    </div>

                    <div className="Detail-item">
                        <span className="Detail-title"> 24H change</span>
                        {renderChangePercent(percentChange24h)}
                    </div>

                    <div className="Detail-item">
                        <span className="Detail-title"> Market cap</span>
                        <span className="Detail-dollar">$</span>
                        {marketCap}
                    </div>

                    <div className="Detail-item">
                        <span className="Detail-title">24H Volume</span>
                        <span className="Detail-dollar">$</span>
                        <span>{volume24h}</span>
                    </div>

                    <div className="Detail-item">
                        <span className="Detail-title">Total supply</span>
                        <span>{totalSupply}</span>
                    </div>

                </div>
            </div>
        )
    }
}

export default Detail;