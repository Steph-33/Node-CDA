const express = require('express');
const router = express.Router();
const products = require('../data/product.json');

router.get('/:id', (request, response) => {
  let product = products.find((iteration, index) => {
    return iteration.id === parseInt(request.params.id);
  });

  if (!product) {
    /** @todo return 404 */
  }

  response.render('product/article-details', {
    title: product.name, datum: {
      id: product.id, picture: product.picture, title: product.name, subtitle: product.price
    }
  });
});

module.exports = router;