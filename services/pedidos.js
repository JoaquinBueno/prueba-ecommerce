const MongoLib = require('../lib/mongo')

class PedidosService {
    constructor(){
        this.collection = 'pedidosAprobados'
        this.mongoDB = new MongoLib()
    }
    async createPedido({pedido}){
        const createPedidoId = await this.mongoDB.create(this.collection, pedido)

        return createPedidoId
    }
    async updatePedido({pedidoId, pedido}){
        const updatePedidoId = await this.mongoDB.update(this.collection, pedidoId, pedido)

        return updatePedidoId
    }
}

module.exports=PedidosService