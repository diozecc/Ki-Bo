const express = require('express')
const shop = express.Router()
const shopController = require('../controller/controller')

shop.get('/', shopController.getShop)
shop.get('/:type', shopController.getKeycapBO)
shop.get('/gioi-thieu', shopController.getIntroduction)
exports.Router = shop