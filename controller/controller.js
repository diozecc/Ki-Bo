const { Services } = require('../models/data')
const service = new Services()

let productData = null

exports.updateProductMiddleware = async (req, res, next) => {
    try {
        const updatedProductData = await service.getProducts()
        productData = updatedProductData
        next()
    } catch (error) {
        console.error('Lỗi khi cập nhật dữ liệu sản phẩm:', error);
        next(error)
    }
}

exports.getShop = async (req, res, next) => {;
    try {
        const nav = await service.getNav()
        res.render('', { pageTitle: 'Ki-Bo', nav, product: productData })
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

        res.render('products/products', { pageTitle, nav, product: productData, productType, dataPage})
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
        console.log(username, password)
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
        res.render('admin/add-product', { pageTitle: 'Add Product', nav})
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