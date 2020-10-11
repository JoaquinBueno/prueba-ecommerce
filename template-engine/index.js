const express = require('express')
const app = express()
const expressJsx = require('./expressJsx')

app.engine('jsx', expressJsx)
app.set('views', './views')
app.set('view engine', 'jsx')

app.get('/', function(req, res, next){
    res.render("index", {hello: 'Hola', world: 'Mundo'})
})

const server = app.listen(8000, function(){
    console.log('listening on port 8000')
})