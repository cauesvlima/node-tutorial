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

// Rota DELETE para remover uma task específica
router.delete('/:idTask', async (req, res, next) => {
    const idTask = req.params.idTask;

    try {
        const task = await Task.findOne({ where: { IdTask: idTask } });

        if (!task) {
            return res.status(404).send({
                mensagem: 'Task não encontrada.'
            });
        }

        await task.destroy();//Deleta a task

        res.status(200).send({
            mensagem: 'Task deletada com sucesso!',
            request: {
                tipo: 'POST',
                descricao: 'Insere uma nova task',
                url: `${process.env.LOCAL_URL}task/`,
                body: { name: 'String', description: 'String', completed: 'Boolean' }
            }
        });

    } catch (error) {
        res.status(500).send({
            mensagem: 'Erro ao tentar deletar a task',
            erro: error.message
        });
    }
});

// Rota PUT para atualizar uma task específica
router.put('/:idTask', async (req, res, next) => {
    const idTask = req.params.idTask;
    const { name, description, completed, color, position, priority } = req.body;

    try {
        // Tentar encontrar a task antes de atualizar
        const task = await Task.findOne({ where: { IdTask: idTask } });

        if (!task) {
            return res.status(404).send({
                mensagem: 'Task não encontrada.'
            });
        }

        // Atualizar os campos fornecidos no corpo da requisição
        if (name) task.Name = name;
        if (description) task.Description = description;
        if (completed !== undefined) task.Completed = completed;
        if (color) task.Color = color;
        if (position !== undefined) task.Position = position;
        if (priority !== undefined) task.Priority = priority;

        // Salvar as alterações
        await task.save();

        // Resposta de sucesso
        res.status(200).send({
            mensagem: 'Task atualizada com sucesso!',
            taskAtualizada: {
                id: task.IdTask,
                name: task.Name,
                description: task.Description,
                completed: task.Completed,
                color: task.Color,
                position: task.Position,
                priority: task.Priority,
                request: {
                    tipo: 'GET',
                    descricao: 'Retorna os detalhes da task atualizada',
                    url: `${process.env.LOCAL_URL}task/${task.IdTask}`
                }
            }
        });

    } catch (error) {
        // Tratamento de erro
        res.status(500).send({
            mensagem: 'Erro ao tentar atualizar a task',
            erro: error.message
        });
    }
});



module.exports = router;