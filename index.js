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


app.use(cors())

 
app.use(express.json())
mercadopago.configurations.setAccessToken(config.accesTokenMP);
// routes
// app.use('/products', productsRouter)
app.use('/api/products', productsApiRouter)
app.use('/api/auth', authApiRouter)
app.post("/process_payment", (req, res) => {

    var payment_data = {
      transaction_amount: Number(req.body.transactionAmount),
      token: req.body.token,
      description: req.body.description,
      installments: Number(req.body.installments),
      payment_method_id: req.body.paymentMethodId,
      issuer_id: req.body.issuer,
      payer: {
        email: req.body.email,
        identification: {
          type: req.body.docType,
          number: req.body.docNumber
        }
      }
    };
  
    mercadopago.payment.save(payment_data)
      .then(function(response) {
        res.status(response.status).json({
          status: response.body.status,
          status_detail: response.body.status_detail,
          id: response.body.id
        });
      })
      .catch(function(error) {
        // res.status(response.status).send(error);
        console.log(error)
      });
  });

//redirect
app.get('/', function(req, res){
    res.redirect('/products')
})

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