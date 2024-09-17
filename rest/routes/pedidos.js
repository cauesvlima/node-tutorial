const express = require('express');
const router = express.Router();

//Retorna tudo
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Lista de pedidos'
    });
});

//Insere pedido
router.post('/',(req, res, next)=>{
    const pedido={
        id_produto: req.body.id_produto,
        quantidade: req.body.quantidade
    }
    res.status(201).send({
        mensagem:'Pedido cadastrado com sucesso!',
        pedidoCriado: pedido
    });
});

//Pega um pedido
router.get('/:id_pedido', (req, res, next)=>{
    const id = req.params.id_pedido;
        res.status(200).send({
            mensagem:'Detalhes do pedido',
            id_pedido:id
        });
});

router.patch('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Pedido alterado!'
    });
});

router.delete('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Pedido excluido!'
    });
});

module.exports = router;