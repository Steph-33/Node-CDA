const express = require('express');
const router = express.Router();
const Product = require('../model/Product')
const products = require('../data/product.json');

router.get('/:id', (request, response) => {
  Product.findById(request.params.id)
  .then(product => {
    if (product) {
      /** @todo return 404 */
      response.render('product/article-details', {
        title: product.name, datum: {
          id: product._id, picture: product.picture, title: product.name, subtitle: product.price
        }
      });
    }
  })
  .catch(error => console.error(error));
});

// Envoi des produits dans la BDD. 
router.post('/', (request, response) => {
    ['name', 'price', 'stock', 'picture'].forEach(property => {
      if (!request.body[property]) {
        response.render('product/product-create', {
          title: 'New Product',
          error: {
            property,
            message: `${property} is required!`
          }
        });
  
        return;
      }
    });
  
    let product = new Product(request.body);
  
    product.save();
  
    response.redirect('/product');
});

// Affichage des données sous le formulaire produit. 
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
      response.render('product/product-create', { title: 'Add Product', data})
    })
    .catch(error => console.error(error));
});

// Modifier un produit dans la BDD
router.get('/:id/edit', (request, response) => {
  Product.findById(request.params.id)
    .then(product => {
      Product.find()
        .then(products => {
          let data = products.map(product => {
            return {
                id : product._id, 
                title : product.name,
                subtitle : product.price,
                stock : product.stock,
                picture : product.picture, 
                primaryCta: `/product/${product._id}`,
                primaryCtaLabel: 'Détails'
            }
          })
          response.render('product/product-create', { title: 'Products administration', data, product })
        })
        .catch(error => console.error(error));
    })
    .catch(error => console.error(error));
})

router.post('/:id/edit', (request, response) => {
  Product.findOneAndUpdate({ _id: request.params.id }, request.body)
    .then(() => response.redirect('/product'))
    .catch(error => console.error(error));
})

// Suppression d'un produit dans la BDD. 
router.post('/:id/delete', (request, response) => {
  let id = request.params.id;
  Product.findByIdAndRemove(id)
      .then(
        response.redirect('/product')
      )
      .catch(error => console.error(error));
});

/**
 * @todo faire un formulaire pour créer un produit en BDD 
 *       Tous les champs doivent être obligatoire et le prix et stock doivent être en numérique
 *       Afficher des les érreurs du formulaire s'il y en a en remettant les infos déjà saisie
 * @todo afficher les produits récupérer depuis notre BDD sur la page d'accueil
 * @todo afficher le produit sur la page détails depuis notre BDD
 * 
 * @todo afficher dans un tableau html la liste des produits sous le formulaire de création
 * @todo rajouter une colonne action pour modifier ou supprimer les produits depuis le tableau
 * @todo pour la modification réutiliser le même formulaire que la création
 */

module.exports = router;