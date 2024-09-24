require('dotenv').config(); // Carregar as variáveis do .env
const express = require('express');
const app = express();

//CRIAÇÂO DE TABELAS COM MODELS
const sequelize = require('./config/database'); // Caminho para o arquivo database.js
const Usuario = require('./models/Usuário'); // Caminho para o model Usuario

// sequelize.sync({ force: false }) // 'force: true' recria a tabela se ela já existir, cuidado com isso!
//     .then(() => {
//         console.log('Tabelas sincronizadas com sucesso!');
//     })
//     .catch(err => {
//         console.error('Erro ao sincronizar tabelas:', err);
//     });

const morgan = require('morgan');

const bodyParser = require('body-parser');

const rotaProdutos = require('./routes/produtos');
const rotaProdutosFn = require('./routes/produtosfn');
const rotaProdutosComModels = require('./routes/produtoscmodels')
const rotaPedidos = require('./routes/pedidos');
// Middleware para interpretar JSON

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false})); //apenas dados simples
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN);

    res.header(
        'Access-Control-Allow-Headers', 
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    
    if (req.method === 'OPTIONS') {
        res.header(
            'Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET'
        );
        return res.status(200).send({});
    };

    next();
});

app.use('/produtos', rotaProdutos);
app.use('/produtosfn', rotaProdutosFn);
app.use('/produtosm', rotaProdutosComModels)
app.use('/pedidos', rotaPedidos);
app.use('/teste',( req, res, next)=>{
    res.status(200).send({
        mensagem:'OK, Deu certo'
    });
});


app.use((req, res, next)=>{
    const erro= new Error('Não encontrado');
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    return res.send({
        erro:{
            mensagem:error.message
        }
    });
});


module.exports = app;