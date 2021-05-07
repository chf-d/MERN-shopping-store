import React, { Component } from 'react'

export default class Product extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className='AllItems'>
                <img className="imgSize" src={this.props.item.image} />
                <h4>{this.props.item.title}</h4>
                <h6>{this.props.item.price} $</h6>
                <button className='productButton' onClick={() => this.props.addToCart(this.props.item)}>Add to cart</button>
            </div>
        )
    }
}
