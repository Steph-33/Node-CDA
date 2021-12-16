const app = require('express');
const router = app.Router();
const products = require('../data/product.json');
const Product = require('../model/Product');

router.get('/', (request, response) => {
    Product.find()
      .then(products => {
        let data = products.map(product => {
        return {
            id : product._id, 
            title : product.name,
            subtitle : product.price,
            stock : product.stock,
            picture : product.picture, 
            primaryCta: `/product/${product.id}`,
            primaryCtaLabel: 'Détails'
        }
      })
      response.render('card-list', { title: 'Home', data})
    })
    .catch(error => console.error(error));
});

module.exports = router;
