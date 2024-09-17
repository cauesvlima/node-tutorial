const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

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

    mysql.getConnection((error, conn)=>{
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field)=>{
                conn.release();
                if(error){
                    res.status(500).send({
                        error:error,
                        response: null
                    })
                }
                res.status(201).send({
                    mensagem:'Produto inserido com sucesso!',
                    produtoCriado: resultado.insertId
                });
            }
        )
    })
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