const express = require('express');
const router = express.Router();
const sequelize = require('../config/database');

const Task = require('../models/Task');
const List = require('../models/List');

router.post('/', async (req, res, next) => {
    try {
        const result = await Task.create({
            Position: req.body.position,
            Name: req.body.name,
            Description: req.body.description,
            IdList: req.body.idlist,
            Color: req.body.color,
            Priority: req.body.priority,
            Completed: req.body.completed

        });
        const response = {
            mensagem: 'Tarefa cadastrada com sucesso!',
            listaCriada: {
                id: result.id,  
                name: result.Name,
                description: result.Description,
                idlist: result.IdList,
                color: result.Color,
                priority: result.Priority,
                completed: result.Completed,
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


// Rota GET para buscar todas as tasks
router.get('/', async (req, res, next) => {
    try {
        const tasks = await Task.findAll();

        if (!tasks || tasks.length === 0) {
            return res.status(404).send({
                mensagem: 'Nenhuma task encontrada.'
            });
        }

        const response = {
            quantidade: tasks.length,
            tasks: tasks.map(task => ({
                id: task.IdTask,
                name: task.Name,
                description: task.Description,
                completed: task.Completed,
                color: task.Color,
                position: task.Position,
                priority: task.Priority,
                idList: task.IdList,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna os detalhes de uma task específica',
                    url: `${process.env.LOCAL_URL}task/${task.IdTask}`
                }
            }))
        };

        res.status(200).send(response);

    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao tentar buscar as tasks',
            erro: error.message
        });
    }
});



module.exports = router;