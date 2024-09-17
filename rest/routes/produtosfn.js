const express = require('express');
const router = express.Router();

// Lista de produtos inicial
let produtos = [
    { id: 1, nome: 'Produto 1', preco: 100 },
    { id: 2, nome: 'Produto 2', preco: 200 },
    { id: 3, nome: 'Produto 3', preco: 300 }
];

// Retorna todos os produtos
router.get('/', (req, res, next) => {
    res.status(200).send({
        mensagem: 'Lista de produtos',
        produtos: produtos
    });
});

// Insere um produto
router.post('/', (req, res, next) => {
    const novoProduto = {
        id: produtos.length + 1, // Incrementa o id
        nome: req.body.nome, // Nome do produto vindo do body
        preco: req.body.preco // Preço do produto vindo do body
    };
    produtos.push(novoProduto); // Adiciona à lista
    res.status(201).send({
        mensagem: 'Produto inserido',
        produto: novoProduto
    });
});

// Pega um produto específico
router.get('/:id_produto', (req, res, next) => {
    const id = req.params.id_produto;
    
    // Verifica se é o id 13
    if (id === '13') {
        res.status(200).send({
            mensagem: 'Faça o L',
            id: id
        });
    } else {
        // Procura o produto com o id fornecido
        const produto = produtos.find(p => p.id == id);
        
        if (produto) {
            res.status(200).send({
                mensagem: 'Produto encontrado',
                produto: produto
            });
        } else {
            res.status(404).send({
                mensagem: 'Produto não encontrado',
                id: id
            });
        }
    }
});

module.exports = router;
