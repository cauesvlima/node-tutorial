const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

const List = require('../models/List');
router.post('/', async (req, res, next) => {
    try {
        const result = await List.create({ Nome: req.body.nome });
        const response = {
            mensagem: 'Lista inserida com sucesso!',
            listaCriada: {
                id: result.id,  
                nome: result.Nome,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todas as listas',
                    url: `${process.env.LOCAL_URL}list/`
                }
            }
        };
        res.status(201).send(response);

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

router.get('/', async (req, res, next) => {
    try {
        const result = await List.create({ Nome: req.body.nome });
        const response = {
            mensagem: 'Lista inserida com sucesso!',
            listaCriada: {
                id: result.id,  
                nome: result.Nome,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna todas as listas',
                    url: `${process.env.LOCAL_URL}list/`
                }
            }
        };
        res.status(201).send(response);

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

module.exports = router;
