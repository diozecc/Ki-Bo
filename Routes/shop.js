const express = require('express')
const shop = express.Router()
const shopController = require('../controller/controller')

shop.get('/', shopController.getShop)
shop.get('/products/:type', shopController.getKeycapBO)
shop.use(shopController.get404)

exports.Router = shop