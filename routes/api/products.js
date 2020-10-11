const express = require('express')
const router = express.Router()
const ProductsServices = require('../../services/products')
const passport = require('passport')
const mercadopago = require('mercadopago')
const {config} = require('../../config/index')
const axios = require('axios')
require('../../utils/auth/strategies/jwt')

const TOKEN = config.accesTokenMP

mercadopago.configure({
    access_token: 'TEST-6738293582789370-101115-fc442f58b4592b86c0869921b2160a79-422885003'
  });

const productService = new ProductsServices()

router.get('/', async function(req, res, next){
    const {tags} = req.query
    try {
        const products = await productService.getProducts({tags})

        res.status(200).json({
            data: products,
            message: 'products listed'
        })
    } catch(err){
        next(err)
    }
})
router.get('/:productId', async function(req, res, next){
    const {productId} = req.params
    
    try {
        const product = await productService.getProduct({productId})
        res.status(200).json({
            data: product,
            message: 'products retrieved'
        })
    }catch(err) {
        next(err)
    }
})
router.post('/',async function(req, res, next){
    const {body: product} = req
    try {
        const createdProduct = await productService.createProduct({product})
        res.status(201).json({
            data: createdProduct,
            message: 'products listed'
        })
    } catch(err){
        next(err)
    }
})
router.put('/:productId', passport.authenticate('jwt', {session: false}), async function(req, res, next){
    const {productId} = req.params
    const {body: product} = req
    try {
        const updatedProduct = await productService.updateProduct({productId, product})
        res.status(200).json({
            data: updatedProduct,
            message: 'products updated'
        })
    } catch(err) {
        next(err)
    }
})
router.delete('/:productId', passport.authenticate('jwt', {session: false}),async function(req, res, next){
    const {productId} = req.params
    try {
        const deletedProduct = await productService.deleteProduct({productId})
        res.status(200).json({
            data: deletedProduct,
            message: 'product deleted'
        })
    } catch(err){
        next(err)
    }
})
router.post('/pagar', async function(req, res, next) {
    console.log('Hola')
    let preference = {
        items: [
          {
            title: 'Chancletas',
            unit_price: 100,
            quantity: 1,
          }
        ]
      };
      const respuesta = await mercadopago.preferences.create(preference)
      res.status(200).json({
          data: respuesta
      })
      
      
})



module.exports= router;