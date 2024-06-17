const { Services } = require('../models/data')
const service = new Services()
const fs = require('fs')
const path = require('path')
const sort = path.join(path.dirname(process.mainModule.filename), 'data', 'sort.json')
const sortList = require('../data/sort.json')


let productList = null

exports.updateProductMiddleware = async (req, res, next) => {
    try {
        const updatedproductList = await service.getProducts()
        productList = updatedproductList
        next()
    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu sản phẩm:', error);
        next(error)
    }
}

exports.getShop = async (req, res, next) => {;
    try {
        const nav = await service.getNav()
        res.render('', { pageTitle: 'Ki-Bo', nav, product: productList })
    } catch (error) {
        next(error)
    }
}

exports.getKeycapBO = async (req, res, next) => {
    try {
        const nav = await service.getNav()
        const productType = req.params.type
        const productTitles = {
            "keycap-cherry": "Keycap Cherry",
            "keycap-moa": "Keycap MOA",
            "keycap-sa": "Keycap SA",
            "keycap-xda": "Keycap XDA",
            "keycap-oem": "Keycap OEM",
            "ban-phim-co": "Bàn Phím Cơ",
            "pre-order": "Pre-Order",
            "chuot": "Chuột"
        }
        const pageTitle = productTitles[productType]
        const dataPage = []
        nav.forEach(e => {
            if (e.slug === "keycap-bo") {
                e.items.forEach(item => {
                    if (item.type === productType) {
                        dataPage.push(e)
                    }
                })
            } else if (e.slug === productType) {
                dataPage.push(e)
            }
        })

        res.render('products/products', { pageTitle, nav, product: productList, productType, dataPage, sortList })
    } catch (error) {
        next(error)
    }
}

exports.getAdmin = async (req, res, next) => {
    try {
        const nav = await service.getNav()
        res.render('admin/login', { pageTitle: 'Login', nav})
    } catch (error) {
        next(error)
    }
}

exports.postAdmin = async (req, res, next) => {
    try {
        const username = req.body.username
        const password = req.body.password
        if (username === 'admin' && password === 'admin') {
            res.redirect('/admin/add-product')
        } else {
            const nav = await service.getNav()
            res.render('admin/login', { pageTitle: 'Login', nav, error: 'Sai tên đăng nhập hoặc mật khẩu!'})
        }
    } catch (error) {
        next(error)
    }

}

exports.getAddProduct = async (req, res, next) => {
    try {
        const nav = await service.getNav()
        res.render('admin/add-product', { pageTitle: 'Add Product', nav, products: productList})
    } catch (error) {
        next(error)
    }

}

exports.postAddProduct = async (req, res, next) => {
    try {
        const id = req.body.id
        const url = req.body.url
        const title = req.body.title
        const image_front = req.body.image_front
        const image_back = req.body.image_back
        const series = req.body.series
        const price = req.body.price
        const isclass = req.body.class
        const isNew = req.body.new
        const button = req.body.button
        if(button === 'Thêm'){
            service.addProduct({ url, title, image_front, image_back, series, price, isclass, isNew})
        }else if(button === 'Cập nhật'){
            service.updateProduct({ id, url, title, image_front, image_back, series, price, isclass, isNew })
        }
        res.redirect('/admin/add-product')
    } catch (error) {
        next(error)
    }

}

exports.getDeteleProduct = async (req, res, next) => {
    try {
        const productType = req.params.type;
        const product = productList.find(e => e.url === productType)
        if (product) {
            service.deleteProduct(product.id)
        }
        res.redirect('/admin/add-product')
    } catch (error) {
        next(error)
    }
}

exports.get404 = async (req, res, next) => {
    try {
        const nav = await service.getNav()
        res.status(404).render('404', { pageTitle: 'Không Tìm Thấy Trang', nav })
    } catch (error) {
        next(error)
    }
}