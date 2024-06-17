module.exports = class Product {
    constructor(id, url, title, imageFront, imageBack, series, price, isNew, productClass) {
        this.id = id;
        this.url = url;
        this.title = title;
        this.imageFront = imageFront;
        this.imageBack = imageBack;
        this.series = series;
        this.price = price;
        this.isNew = isNew;
        this.productClass = productClass;
    }
}
