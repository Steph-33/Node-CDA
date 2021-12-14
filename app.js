const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const products = require('./data/product.json');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules/bootstrap/dist')))

app.get('/', (request, response) => {
  let data = products.map(product => {
    return {title:product.name, subtitle : product.price, picture:product.picture};
  })
  response.render('card-list', {title : 'Home', data});
});

app.get('/about-us', (request, response) => {
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

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
