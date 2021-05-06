import React, { Component } from 'react'
import Product from './Product.jsx';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {

            cart: false,
            cartList: [],
            total: 0

        }
    }

    displayCart = () => {

        if (this.state.cart) {

            if (this.state.cartList.length <= 0) {

                return <div>There is nothing in the cart</div>

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
                                            <button onClick={() => { this.removeFromCart(item, i) }}>❌</button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </table>

                        <br />
                        total = {this.state.total}
                        <br />
                        <button onClick={this.finishTransaction}>buy</button>
                    </div>
                )
            }
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

                <button className='sistemButton card' onClick={() => { this.setState({ cart: !this.state.cart }) }} >cart</button><br />
                {this.displayCart()}


                {this.props.productsList.map((item) => {
                    return <Product item={item} addToCart={this.addToCart} />
                })}

            </div>
        )
    }
}
