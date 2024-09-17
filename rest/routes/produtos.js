const express = require('express');
const router = express.Router();

//Retorna tudo
router.get('/', (req, res, next)=>{
    res.status(200).send({
        mensagem:'Usando o GET dentro da rota de profutos'
    });
});

//Insere produto
router.post('/',(req, res, next)=>{
    res.status(201).send({
        mensagem:'Usando o POST dentro da rota de profutos'
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

module.exports = router;