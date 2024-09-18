const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//Retorna tudo
router.get('/', (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})};
        
        conn.query(
            'SELECT * FROM produtos',
            (error, resultado, field)=>{
                conn.release();
                if(error){res.status(500).send({error:error})}
                return res.status(200).send({response:resultado});
            }
        )
    })
});

//Insere produto
router.post('/',(req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})};
        conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field)=>{
                conn.release();
                if(error){res.status(500).send({error:error})};
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
        mysql.getConnection((error, conn)=>{
            if(error){return res.status(500).send({error:error})};
            conn.query(
                'SELECT * FROM produtos WHERE idprodutos = ?;',
                [req.params.id_produto],
                (error, resultado, field)=>{
                    conn.release();
                    if(error){res.status(500).send({error:error})}
                    return res.status(200).send({response:resultado});
                }
            )
        })
});

router.patch('/', (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})};
        conn.query(
            `UPDATE produtos
            SET nome = ?,
                preco = ?
                WHERE idprodutos =?`,
            [req.body.nome, req.body.preco, req.body.idprodutos],
            (error, resultado, field)=>{
                conn.release();
                if(error){res.status(500).send({error:error})};
                res.status(201).send({
                    mensagem:'Produto alterado com sucesso!',
                });
            }
        )
    })
});

router.delete('/', (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})};
        conn.query(
            `DELETE FROM produtos WHERE idprodutos =?`,
            [req.body.idprodutos],
            (error, resultado, field)=>{
                conn.release();
                if(error){res.status(500).send({error:error})};
                res.status(202).send({
                    mensagem:'Produto deletado com sucesso!',
                });
            }
        )
    })
});

module.exports = router;