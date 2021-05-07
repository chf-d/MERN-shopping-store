import React, { Component } from 'react'
import Product from './Product.jsx';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {

            cartList: [],
            total: 0,
            display: 'none',
        }
    }

    displayCart = () => {

        if (this.state.cartList.length <= 0) {

            return <h2>There is nothing in the cart</h2>

        }
        else {
            return (
                <div>
                    <table>
                        <tr>
                            <td>title</td>
                            <td>price</td>
                            <td>Image</td>
                            <td>delete</td>
                        </tr>

                        {this.state.cartList.map((item, i) => {
                            return (
                                <tr>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td><img className="imgSize2" src={item.image} /></td>
                                    <td>
                                        <button id='removeFromCart' onClick={() => { this.removeFromCart(item, i) }}>❌</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </table>

                    <h2>total = {this.state.total}</h2>
                    <button className='sistemButton' onClick={this.finishTransaction}>buy</button>
                </div>
            )
        }

    }

    setDisplay = () => {
        if (this.state.display == 'none') {

            this.setState({ display: 'block' })
        }
        else {
            this.setState({ display: 'none' })
        }
    }

    addToCart = (item) => {
        this.setState({ cartList: [...this.state.cartList, item] })
        this.setState({ total: this.state.total + parseInt(item.price) })
    }

    removeFromCart = (item, ind) => {
        this.setState({ cartList: this.state.cartList.filter((e, i) => i != ind) })

        if (this.state.total > 0) {
            this.setState({ total: this.state.total - parseInt(item.price) })
        }
    }

    finishTransaction = () => {

        let newTransaction = {

            products: this.state.cartList,
            total: this.state.total
        }
        axios.post('/api/addTransaction/', newTransaction)

        this.props.getDatafromDB()

        this.setState({ cartList: [], total: 0 })
        alert('Transaction successfully received')
    }

    render() {
        return (
            <div>
                <button className='sistemButton' onClick={() => { this.setDisplay() }} >cart</button><br />

                <div id='displayCart'>
                    <div className='cart' style={{ display: this.state.display }}>
                        {this.displayCart()}
                    </div>
                </div>

                {this.props.productsList.map((item) => {
                    return <Product item={item} addToCart={this.addToCart} />
                })}

            </div>
        )
    }
}
