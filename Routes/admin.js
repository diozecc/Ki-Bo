const express = require('express')
const admin = express.Router()
const adminController = require('../controller/controller')

admin.get('/login',adminController.getAdmin)
admin.post('/login',adminController.postAdmin)
admin.get('/add-product',adminController.getAddProduct)
module.exports = admin