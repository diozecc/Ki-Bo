const axios = require('axios');

class Services {
    async fetchData(endpoint, method, data) {
        try {
            const res = await axios({
                url: `https://666941bb2e964a6dfed4569b.mockapi.io/${endpoint}`,
                method,
                data,
            });
            return res.data
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    //Nav
    async getNav() {
        return this.fetchData('Nav', 'GET');
    }

    // Product
    async getProducts() {
        return this.fetchData('product', 'GET');
    }

    async addProduct(product) {
        await this.fetchData('product', 'POST', product);
    }

    async deleteProduct(id) {
        await this.fetchData(`product/${id}`, 'DELETE');
    }

    async getProductById(id) {
        return this.fetchData(`product/${id}`, 'GET');
    }

    async updateProduct(product) {
        await this.fetchData(`product/${product.id}`, 'PUT', product);
    }
}
module.exports = { Services };
