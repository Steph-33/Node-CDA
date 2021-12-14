const app = require('express');
const products = require('../data/product.json');
const router = app.Router();

router.get('/', (request, response) => {
    let data = products.map(product => {
      return {title:product.name, subtitle : product.price, picture:product.picture};
    })
    response.render('card-list', {title : 'Home', data});
  });

module.exports = router;