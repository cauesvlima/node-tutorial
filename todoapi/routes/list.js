const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

const List = require('../models/List');
const Task = require('../models/Task');


//Insere a lista
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


//Lista de listas
router.get('/', async (req, res, next) => {
    try {
        const lists = await List.findAll({
            include: [{
                model: Task,
                as: 'tb_tasks'
            }]
        });
        if (lists.length === 0) {
            return res.status(404).send({
                mensagem: 'Nenhuma lista encontrada.',
                result: 0
            });
        }
        const response = {
            quantidade: lists.length,
            listas: lists.map(list => {
                return {
                    id: list.id,
                    nome: list.Nome,
                    tasks: list.tb_tasks.map(task => ({
                        idTask: task.IdTask,
                        position: task.Position,
                        name: task.Name,
                        description: task.Description,
                        color: task.Color,
                        priority: task.Priority,
                        completed: task.Completed
                    })),
                    request: {
                        tipo: 'GET',
                        descricao: 'Retorna os detalhes de uma lista específica',
                        url: `${process.env.LOCAL_URL}list/${list.id}`
                    }
                }
            })
        };
        res.status(200).send(response);

    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao buscar as listas',
            erro: error.message
        });
    }
});


//Pega lista específica
router.get('/:idList', async (req, res, next) => {
    const idList = req.params.idList;

    try {
        const list = await List.findOne({
            where: { id: idList },
            include: [{
                model: Task,
                as: 'tb_tasks'
            }]
        });

        if (!list) {
            return res.status(404).send({
                mensagem: 'Lista não encontrada.',
                result: 0
            });
        }

        const response = {
            id: list.id,
            nome: list.Nome,
            tarefas: list.tb_tasks.map(task => ({
                idTask: task.IdTask,
                position: task.Position,
                name: task.Name,
                description: task.Description,
                color: task.Color,
                priority: task.Priority,
                completed: task.Completed
            })),
            request: {
                tipo: 'GET',
                descricao: 'Retorna todas as listas',
                url: `${process.env.LOCAL_URL}list/`
            }
        };
        res.status(200).send(response);

    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao buscar a lista',
            erro: error.message
        });
    }
});
module.exports = router;
