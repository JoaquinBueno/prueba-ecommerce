const express = require('express')
const cors = require('cors')
const app = express()
const path = require('path')
const boom = require('@hapi/boom')
const productsRouter = require('./routes/products')
const productsApiRouter = require('./routes/api/products')
const {logErrors, wrapErrors, clientErrorHandler, errorHandler} = require('./utils/middleware/errorHandlers')
const isRequestAjaxOrApi = require('./utils/isRequestAjaxOrApi')
const authApiRouter = require('./routes/api/auth')
const {config} = require('./config/index')
const mercadopago = require('mercadopago')
const pedidosApiRouter = require('./routes/api/pedidos')


// app.use(cors())
app.use(express.static(path.join(__dirname, 'build')));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
  
 
app.use(express.json())
mercadopago.configurations.setAccessToken(config.accesTokenMP);
// routes
// app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)
app.use('/api/auth', authApiRouter)
app.use('/api/pedidos', pedidosApiRouter)

//redirect
// app.get('/', function(req, res){
//     res.redirect('/products')
// })

app.use(function(req, res, next){
    if(isRequestAjaxOrApi(req)) {
        const {
            output: {statusCode, payload}
        } = boom.notFound()

        res.status(statusCode).json(payload)
    }
    res.status(404).render('404')
})

// Error handlers
app.use(logErrors)
app.use(wrapErrors)
app.use(clientErrorHandler)
app.use(errorHandler)


const server = app.listen(8000, function(){
    console.log('server listening on port 8000')
})