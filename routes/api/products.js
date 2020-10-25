const express = require('express')
const router = express.Router()
const ProductsServices = require('../../services/products')
const passport = require('passport')
const mercadopago = require('mercadopago')

require('../../utils/auth/strategies/jwt')


mercadopago.configure({
    access_token: 'APP_USR-5801127985980891-101015-8d518a538b15de449e725ccde902e060-584109445',
    client_id: '5801127985980891',
    client_secret: 'ThRBZyVvZvZ1cAilTu4TBjtDKXZY2Vro'
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
    const id = req.body._id
    let preference = {
        back_urls: {
            success: 'http://giraffeindumentaria.com/checkout/' + id,
            failure: 'http://giraffeindumentaria.com/checkout/' + id,
            pending: 'http://giraffeindumentaria.com/checkout/' + id
        },
        auto_return: "all",
        items: [
          {
            title: req.body.title,
            unit_price: req.body.valor,
            quantity: req.body.cantidad,
          }
        ]
      };
      const respuesta = await mercadopago.preferences.create(preference)
      res.status(200).json({
          data: respuesta
      })
      
      
})
router.post('/pedidoAgendado', async function(req, res, next){
    const {body: pedido} = req
    try {
        const createdPedido = await productService.createPedido({pedido})
        res.status(201).json({
            data: createdPedido,
            message: 'pedidos listed'
        })
    } catch(err){
        next(err)
    }
})


module.exports= router;