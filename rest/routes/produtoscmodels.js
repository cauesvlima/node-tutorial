const express = require('express');
const router = express.Router();
const Produto = require('../models/Produto');

// Retorna todos os produtos
router.get('/', async (req, res, next) => {
    try {
        const produtos = await Produto.findAll();
        const response = {
            quantidade: produtos.length,
            produtoscommodels: produtos.map(prod => ({
                idprodutos: prod.idprodutos,
                nome: prod.nome,
                preco: prod.preco,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna um produto específico',
                    url: `${process.env.LOCAL_URL}produtos/${prod.idprodutos}`
                }
            }))
        };
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error });
    }
});

// Insere um produto
router.post('/', async (req, res, next) => {
    try {
        const novoProduto = await Produto.create({
            nome: req.body.nome,
            preco: req.body.preco
        });
        const response = {
            mensagem: 'Produto inserido com sucesso!',
            produtoCriado: {
                id_produto: novoProduto.idprodutos,
                nome: novoProduto.nome,
                preco: novoProduto.preco,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os produtos',
                    url: `${process.env.LOCAL_URL}produtos/`
                }
            }
        };
        res.status(201).send(response);
    } catch (error) {
        res.status(500).send({ error });
    }
});

// Retorna um produto específico
router.get('/:id_produto', async (req, res, next) => {
    try {
        const produto = await Produto.findByPk(req.params.id_produto);
        if (!produto) {
            return res.status(404).send({ mensagem: 'Produto não encontrado!' });
        }
        const response = {
            produto: {
                id_produto: produto.idprodutos,
                nome: produto.nome,
                preco: produto.preco,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna um produto específico',
                    url: `${process.env.LOCAL_URL}produtos/${produto.idprodutos}`
                }
            }
        };
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error });
    }
});

// Atualiza um produto
router.patch('/:id_produto', async (req, res, next) => {
    try {
        await Produto.update(
            { nome: req.body.nome, preco: req.body.preco },
            { where: { idprodutos: req.params.id_produto } }
        );
        const response = {
            mensagem: 'Produto atualizado com sucesso!',
            produtoAtualizado: {
                id_produto: req.params.id_produto,
                nome: req.body.nome,
                preco: req.body.preco,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todos os produtos',
                    url: `${process.env.LOCAL_URL}produtos/${req.params.id_produto}`
                }
            }
        };
        res.status(200).send(response);
    } catch (error) {
        res.status(500).send({ error });
    }
});

// Deleta um produto
router.delete('/:id_produto', async (req, res, next) => {
    try {
        await Produto.destroy({ where: { idprodutos: req.params.id_produto } });
        const response = {
            mensagem: 'Produto excluído com sucesso!',
            request: {
                tipo: 'POST',
                descricao: 'Insere um produto',
                url: `${process.env.LOCAL_URL}produtos/`,
                body: {
                    nome: 'String',
                    preco: 'Number'
                }
            }
        };
        res.status(202).send(response);
    } catch (error) {
        res.status(500).send({ error });
    }
});

module.exports = router;
