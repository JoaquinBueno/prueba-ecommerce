const {config} = require('../../config')
const Sentry = require('@sentry/node')
const boom = require('@hapi/boom')
const isRequestAjaxOrApi = require('../../utils/isRequestAjaxOrApi')

Sentry.init({dsn: config.sentryDns})

function withErrorStack(err, stack){
    if (config.dev){
        return {...err, stack}
    }
}

function logErrors(err, req, res, next){
    Sentry.captureException(err)
    console.log(err.stack)
    next(err)
}

function wrapErrors(err, req, res, next){
    if (!err.isBoom){
        next(boom.badImplementation(err))
    }
    next(err)
}

function clientErrorHandler(err, req, res, next){
    const {
        output: {statusCode, payload}
    } = err
    //carching error for AJAX req or while streaming
    if (isRequestAjaxOrApi(req) || res.headersSent) {
        res.status(statusCode).json(withErrorStack(payload, err.stack))
    } else {
        next(err)
    }
}

function errorHandler(err, req, res, next) {
    const {
        output: {statusCode, payload}
    } = err
    res.status(statusCode)
    res.render('error', (payload, err.stack))
}

module.exports ={
    logErrors,
    wrapErrors,
    clientErrorHandler,
    errorHandler
}