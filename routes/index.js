const app = require('express');
const router = app.Router();
const products = require('../data/product.json');

router.get('/', (request, response) => {
  let data = products.map(product => {
    return {
      id: product.id,
      title: product.name,
      subtitle: product.price,
      picture: product.picture,
      primaryCta: `/product/${product.id}`,
      primaryCtaLabel: 'Détails'
    };
  });
  response.render('card-list', { title: 'Home', data });
});

module.exports = router;
