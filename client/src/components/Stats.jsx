import React, { Component } from 'react'

export default class Stats extends Component {

    constructor(props) {
        super(props)

        this.state = {

            top5Sales: [],
            top5UniqueSales: [],
            past5Days: [],

        }
    }

    componentDidMount() {

        this.CalcProducts()
        this.CalcDays()
    }

    CalcProducts = () => {

        let transactionsList = this.props.transactionsList
        let productsResult = []

        transactionsList.forEach(transaction => {

            transaction.products.forEach(product => {

                if (productsResult.length == 0) {

                    productsResult.push({
                        product: product,
                        transaction_id: transaction._id,
                        productCounter: 1,
                        productUniqueCounter: 1
                    })
                }
                else {

                    let Counter = 0
                    productsResult.forEach(item => {

                        if (item.product._id == product._id) {
                            Counter++
                        }
                    })

                    if (Counter == 0) {

                        productsResult.push({
                            product: product,
                            transaction_id: transaction._id,
                            productCounter: 1,
                            productUniqueCounter: 1
                        })
                    }
                    else {

                        productsResult.forEach(item => {

                            if (item.product._id == product._id) {

                                if (item.transaction_id == transaction._id) {

                                    item.productCounter++
                                }
                                else {
                                    item.transaction_id = transaction._id
                                    item.productCounter++
                                    item.productUniqueCounter++
                                }
                            }
                        })
                    }
                }
            })
        })

        this.CalcTop5Sales(productsResult)
        this.CalcTop5UniqueSales(productsResult)
    }

    CalcTop5Sales = (productsResult) => {

        let nweProductsResult = productsResult
        let top5Sales = []

        let len = 5
        if (nweProductsResult.length < 5) {
            len = nweProductsResult.length
        }

        for (let i = 0; i < len; i++) {

            let top = []

            nweProductsResult.forEach(product => {

                if (top == '') {

                    top = product
                }
                else {

                    if (product.productCounter > top.productCounter) {

                        top = product
                    }
                }
            })

            top5Sales.push(top)
            nweProductsResult = nweProductsResult.filter(product => product.product._id != top.product._id)
        }

        this.setState({ top5Sales: top5Sales })
    }

    CalcTop5UniqueSales = (productsResult) => {

        let nweProductsResult = productsResult
        let top5UniqueSales = []

        let len = 5
        if (nweProductsResult.length < 5) {
            len = nweProductsResult.length
        }

        for (let i = 0; i < len; i++) {

            let top = []

            nweProductsResult.forEach(product => {

                if (top == '') {

                    top = product
                }
                else {

                    if (product.productUniqueCounter > top.productUniqueCounter) {

                        top = product
                    }
                }
            })

            top5UniqueSales.push(top)
            nweProductsResult = nweProductsResult.filter(product => product.product._id != top.product._id)
        }

        this.setState({ top5UniqueSales: top5UniqueSales })
    }

    CalcDays = () => {

        let transactionsList = this.props.transactionsList

        let past5Days = []

        for (let i = 0; i < 5; i++) {

            let date = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' })
            let total = 0

            transactionsList.forEach(transaction => {
                if (transaction.date == date) {

                    total += transaction.total
                }
            })

            past5Days.push({
                Day: date,
                total: total
            })

        }

        this.setState({ past5Days: past5Days })
    }


    render() {
        return (
            <div className='flex'>

                <div >
                    <h3>top 5 sales</h3>

                    {this.state.top5Sales.map(item => {

                        return <h4>{item.product.title}</h4>
                    })}

                </div>

                <div>
                    <h3>top 5 unique sales</h3>

                    {this.state.top5UniqueSales.map(item => {

                        return <h4>{item.product.title}</h4>
                    })}

                </div>

                <div>
                    <h3>past 5 days</h3>

                    {this.state.past5Days.map(item => {

                        return <h4>{item.Day} {item.total}</h4>
                    })}

                </div>

            </div >
        )
    }
}
