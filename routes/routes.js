const router = require('express').Router();
let Product = require('../Schemas/productSchema');
let Transaction = require('../Schemas/transactionSchema');

//get all products
router.get('/getProducts', (req, res) => {
    Product.find()
        .then(data => res.json(data))
        .catch(error => res.json(error))
})

//get all transactions
router.get('/getTransactions', (req, res) => {
    Transaction.find()
        .then(data => res.json(data))
        .catch(error => res.json(error))
})

// add a new product
router.post('/addProduct', (req, res) => {

    const newProduct = new Product({

        title: req.body.title,
        price: req.body.price,
        description: req.body.description,
        image: req.body.image,
    })
    newProduct.save()
        .then(data => res.json(data))
        .catch(error => res.json(error))
})

// add a new transaction
router.post('/addTransaction', (req, res) => {

    const newTransaction = new Transaction({

        date: new Date().toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' }),
        products: req.body.products,
        total: req.body.total,
    })
    newTransaction.save()
        .then(data => res.json(data))
        .catch(error => res.json(error))
})

// update a product
router.post('/updateProduct/:_id', (req, res) => {

    Product.findById(req.params._id)
        .then(product => {

            product.title = req.body.title
            product.price = req.body.price
            product.description = req.body.description
            product.image = req.body.image

            product.save()
                .then(user => res.json(user))
                .catch(error => res.json(error))
        })
        .catch(err => res.status(400).json('eror ' + err))
})

// delete a product
router.delete('/deleteProduct/:_id', (req, res) => {

    Product.deleteOne({ _id: req.params._id }, (err) => {
        if (err) throw err
    })
})

module.exports = router