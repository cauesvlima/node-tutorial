const express = require('express');
const app = express();

const rotaProdutos = require('./routes/produtos')
const rotaProdutosFn = require('./routes/produtosfn')
app.use(express.json()); // serve para pegar json
app.use('/produtos', rotaProdutos);
app.use('/produtosfn', rotaProdutosFn);
app.use('/teste',( req, res, next)=>{
    res.status(200).send({
        mensagem:'OK, Deu certo'
    });
});


module.exports = app;