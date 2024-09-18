const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//Retorna tudo
router.get('/', (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})};
        
        conn.query(
            'SELECT * FROM produtos',
            (error, result, field)=>{
                conn.release();
                if(error){res.status(500).send({error:error})}
                const response = {
                    quantidade: result.length,
                    produto:result.map(prod =>{
                        return{
                            idprodutos:prod.idprodutos,
                            nome:prod.nome,
                            preco:prod.preco,
                            request:{
                                tipo:'GET',
                                descricao:'Retorna um produto específico',
                                url:`${process.env.LOCAL_URL}produtos/${prod.idprodutos}`
                            }
                        }
                    })
                }
                return res.status(200).send(response);
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
                const response = {
                    mensagem:'Produto inserido com sucesso!',
                    produtoCriado:{
                        id_produto:resultado.insertId,
                        nome:req.body.nome,
                        preco:req.body.preco,
                        request:{
                            tipo:'GET',
                            descricao:'Retorna todos os produtos',
                            url:`${process.env.LOCAL_URL}produtos/`
                        }
                    }
                }
                res.status(201).send(response);
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
                    
            if (resultado.length == 0) {return res.status(404).send({mensagem:'Não foi encontrado nenhum produto com esse ID'})}
            const response ={
                produto: {
                    id_produto: resultado[0].idprodutos,
                    nome: resultado[0].nome,
                    preco: resultado[0].preco,
                    request:{
                        tipo:'GET',
                        descricao:'Retorna um produto específico',
                        url:`${process.env.LOCAL_URL}produtos/${resultado[0].idprodutos}`
                    }
                }
            }
                    return res.status(200).send(response);
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
            (error, result, field)=>{
                conn.release();
                if(error){res.status(500).send({error:error})};
                const response = {
                    mensagem:'Produto alterado com sucesso!',
                    produtoAtualizado:{
                        id_produto:req.body.idprodutos,
                        nome:req.body.nome,
                        preco:req.body.preco,
                        request:{
                            tipo:'GET',
                            descricao:'Retorna todos os produtos',
                            url:`${process.env.LOCAL_URL}produtos/` + req.body.idprodutos
                        }
                    }
                }
                res.status(201).send(response);
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