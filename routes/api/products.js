const express = require('express')
const router = express.Router()
const ProductsServices = require('../../services/products')
const passport = require('passport')

require('../../utils/auth/strategies/jwt')


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


module.exports= router;