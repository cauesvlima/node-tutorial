const express = require('express');
const router = express.Router();

//Retorna tudo
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Usando o GET dentro da rota de produtos'
    });
});

//Insere produto
router.post('/',(req, res, next)=>{
    const produto = {
        nome: req.body.nome,
        preco :req.body.preco
    }
    res.status(201).send({
        mensagem:'Usando o POST dentro da rota de produtos',
        produtoCriado: produto
    });
});

//Pega um produto
router.get('/:id_produto', (req, res, next)=>{
    const id = req.params.id_produto;
    if(id === '13'){
        res.status(200).send({
            mensagem:'Faça o L',
            id:id
        });
    }else{
        res.status(200).send({
            mensagem:'Usando o GET de um produto exclusivo',
            id:id
        });
    }
});

router.patch('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Usando o PATCH dentro de uma rota de produtos'
    });
});

router.delete('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Usando o DELETE dentro de uma rota de produtos'
    });
});

module.exports = router;