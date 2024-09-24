const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//Retorna tudo
router.get('/', (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})};
        conn.query(
            'SELECT * FROM pedidos',
            (error, result, field)=>{
                if(error){res.status(500).send({error:error})}
                const response = {
                    quantidade: result.length,
                    pedido:result.map(prod =>{
                        return{
                            idpedidos:prod.idpedidos,
                            quantidade:prod.quantidade,
                            idproduto:prod.id_produtos,
                            request:{
                                tipo:'GET',
                                descricao:'Retorna um pedido específico',
                                url:`${process.env.LOCAL_URL}pedidos/${prod.idpedidos}`,
                                urlproduto:process.env.LOCAL_URL + 'produtos/' + prod.id_produtos
                            }
                        }
                    })
                };
                return res.status(200).send(response);
            }
        )
    })
});

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({ error: error }) };

        // Primeira query para verificar se o produto existe
        conn.query('SELECT * FROM produtos WHERE idprodutos = ?;', [req.body.id_produtos],
            (error, result, field) => {
                if (error) {
                    conn.release();
                    return res.status(500).send({ error: error });
                }

                if (result.length == 0) {
                    conn.release();
                    // Se o produto não for encontrado, retorna 404 e finaliza a requisição
                    return res.status(404).send({ mensagem: 'Produto não encontrado' });
                }

                // Se o produto foi encontrado, prossegue com a inserção
                conn.query(
                    'INSERT INTO pedidos (quantidade, id_produtos) VALUES (?,?)',
                    [req.body.quantidade, req.body.id_produtos],
                    (error, result, field) => {
                        conn.release();
                        if (error) {
                            return res.status(500).send({ error: error });
                        }

                        const response = {
                            mensagem: 'Pedido inserido com sucesso!',
                            pedidoCriado: {
                                idpedidos: result.insertId,
                                quantidade: req.body.quantidade,
                                id_produtos: req.body.id_produtos,
                                request: {
                                    tipo: 'GET',
                                    descricao: 'Retorna todos os pedidos',
                                    url: `${process.env.LOCAL_URL}pedidos/`
                                }
                            }
                        };
                        res.status(201).send(response);
                    }
                );
            }
        );
    });
});


//Pega um pedido
router.get('/:idpedidos', (req, res, next)=>{
    mysql.getConnection((error, conn)=>{
        if(error){return res.status(500).send({error:error})};

        conn.query(
            'SELECT * FROM pedidos WHERE idpedidos = ?;',
            [req.params.idpedidos],
            (error, resultado, field)=>{
                conn.release();
                if(error){res.status(500).send({error:error})}
                
        if (resultado.length == 0) {return res.status(404).send({mensagem:'Não foi encontrado nenhum pedido com esse ID'})}
        const response ={
            pedido: {
                idpedidos: resultado[0].idpedidos,
                quantidade: resultado[0].quantidade,
                id_produtos: resultado[0].id_produtos,
                request:{
                    tipo:'GET',
                    descricao:'Retorna um pedido específico',
                    url:`${process.env.LOCAL_URL}pedidos/${resultado[0].idpedidos}`
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
            `UPDATE pedidos 
            SET quantidade = ?
                id_produtos = ?
                WHERE idpedidos = ?`,
            [req.body.quantidade, req.body.id_produtos, req.body.idpedidos],
            (error, result, field)=>{
                conn.release();
                if(error){res.status(500).send({error:error})};
                const response = {
                    mensagem:'Produto alterado com sucesso!',
                    produtoCriado:{
                        idpedidos:req.body.idpedidos,
                        quantidade:req.body.quantidade,
                        id_produtos:req.body.id_produtos,
                        request:{
                            tipo:'GET',
                            descricao:'Retorna pedido alterado',
                            url:`${process.env.LOCAL_URL}pedidos/${req.body.idpedidos}`
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
            `DELETE FROM pedidos WHERE idpedidos =?`,
            [req.body.idpedidos],
            (error, resultado, field)=>{
                conn.release();
                if(error){res.status(500).send({error:error})};
                const response = {
                    mensagem:'Pedido excluído com sucesso!',
                    request:{
                        tipo:'POST',
                        descrição:'insere um pedido',
                        url:`${process.env.LOCAL_URL}pedidos/`,
                        body:{
                            nome: 'String',
                            preco:'Number'
                        }
                    }
                }
                res.status(202).send(response);
            }
        )
    })
});

module.exports = router;