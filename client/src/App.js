import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import axios from 'axios';
import './App.css';
import Main from './components/Main.jsx';
import Admin from './components/Admin.jsx';
import Home from './components/Home.jsx';
import Stats from './components/Stats.jsx';

export default class App extends Component {

  state = {
    productsList: [],
    transactionsList: []
  }

  componentDidMount() {
    this.getDatafromDB()
  }

  getDatafromDB = () => {

    axios.get('/api/getProducts')
      .then((res) => {
        this.setState({ productsList: res.data })
      })

    axios.get('/api/getTransactions')
      .then((res) => {
        this.setState({ transactionsList: res.data })
      })
  }

  removeProduct = (Product, index) => {

    axios.delete(`/api/deleteProduct/${Product._id}`, Product)
      .then((res) => {
        console.log(res);
      })

    this.setState({ productsList: this.state.productsList.filter((e, i) => i != index) })
  }

  updateProducts = (updateProduct, index) => {

    axios.post(`/api/updateProduct/${updateProduct._id}`, updateProduct)
      .then((res) => {
        console.log(res);
      })

    let productsList = this.state.productsList
    productsList[index] = updateProduct
    this.setState({ productsList: productsList })
  }

  addproduct = (newProduct) => {

    axios.post('/api/addProduct/', newProduct)

    this.setState({ productsList: [...this.state.productsList, newProduct] })
  }

  render() {
    return (
      <div className="App">

        <Router>
          <Switch>

            <Route exact path='/' component={() => { return <Main /> }} />
            <Route exact path='/admin' component={() => {
              return <Admin
                productsList={this.state.productsList}
                updateProducts={this.updateProducts}
                addproduct={this.addproduct}
                removeProduct={this.removeProduct}
              />
            }} />
            <Route exact path='/home' component={() => { return <Home productsList={this.state.productsList} getDatafromDB={this.getDatafromDB} /> }} />
            <Route exact path='/stats' component={() => { return <Stats transactionsList={this.state.transactionsList} /> }} />

          </Switch>
        </Router>

      </div>
    )
  }
}

