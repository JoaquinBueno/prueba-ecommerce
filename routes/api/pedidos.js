const express = require('express')
const router = express.Router()
const PedidosService = require('../../services/pedidos')

const pedidoService = new PedidosService()

router.post('/',async function(req, res, next){
    const {body: pedido} = req

    try {
        const createdPedido = await pedidoService.createPedido({pedido})
        res.status(201).json({
            data: createdPedido,
            message: 'pedido listed'
        })
    } catch(err){
        next(err)
    }
})

router.put('/:pedidoId', async function(req, res, next){
    const {pedidoId} = req.params
    const {body: pedido} = req
    try {
        const updatedPedido = await pedidoService.updatePedido({pedidoId, pedido})
        res.status(200).json({
            data: updatedPedido,
            message: 'pedidos updated'
        })
    } catch(err) {
        next(err)
    }
})
module.exports= router;