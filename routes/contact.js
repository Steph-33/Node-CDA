const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    response.render('contact/new', { title: 'Contact us' });
  })

router.post('/', (request, response) => {
  console.log(`${request.body.name} - ${request.body.email}`);
  response.redirect('/contact-us');
})

module.exports=router;