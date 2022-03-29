const express = require('express')
const route = express.Router()

const productController = require('../controllers/produtController') 

route.post('/createProduct', productController.createProduct)
route.get('/getProduct', productController.getProduct)
route.put('/updateProduct', productController.updateProduct)
route.delete('/deleteTag', productController.deleteTag)

module.exports = route
