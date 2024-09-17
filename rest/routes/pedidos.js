const express = require('express');
const router = express.Router();

//Retorna tudo
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Lista de pedidos'
    });
});

//Insere produto
router.post('/',(req, res, next)=>{
    res.status(201).send({
        mensagem:'Pedido cadastrado com sucesso!'
    });
});

//Pega um produto
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