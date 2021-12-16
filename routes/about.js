const express = require('express');
const router = express.Router();

router.get('/', (request, response) => {
    let persons = [
      {name : 'Steph', age : 46 }, 
      {name : 'Beaura', age : 32 }, 
      {name : 'JB', age : 33 }, 
    ]
    persons = persons.map(person => {
      return {title:person.name, subtitle:person.age};
    });
    response.render('card-list', {title : 'About Us', data : persons});
});

module.exports = router;