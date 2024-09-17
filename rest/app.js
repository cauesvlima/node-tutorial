const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos')
const rotaProdutosFn = require('./routes/produtosfn')
const rotaPedidos = require('./routes/pedidos')
// Middleware para interpretar JSON
app.use(express.json());

app.use('/produtos', rotaProdutos);
app.use('/produtosfn', rotaProdutosFn);
app.use('/pedidos', rotaPedidos);
app.use('/teste',( req, res, next)=>{
    res.status(200).send({
        mensagem:'OK, Deu certo'
    });
});


module.exports = app;