const app = require('express');
const router = app.Router();
const Order = require('../model/order');
  
router.get('/address', (request, response) => {
  response.render('checkout/address', {user : request.session.user, title : "Confirmer Achat"})
});
  
router.post('/address', (request, response) => {
    if (!request.session.user) {
      request.session.user = {};
    }
  
    request.session.user.deliveryAddress = request.body;
  
    response.redirect('/checkout/payment');
});

router.get('/payment', (request, response) => {
    response.render('checkout/payment', { title: 'Payment' });
  });
  
  router.post('/payment', (request, response) => { 
    let order = new Order({
        products: request.session.cart,
        deliveryAddress: request.session.user.deliveryAddress
    });
    
    order.save()
    .then(() => {
        request.session.cart = [];
        response.redirect('/');
    })
    .catch(error => console.error(error));
  });

module.exports = router;