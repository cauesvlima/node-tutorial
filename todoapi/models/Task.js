const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const List = require('./List'); // Importa o modelo tb_list

// Modelo para a tabela tb_task
const Task = sequelize.define('tb_task', {
    IdTask: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Position: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Name: {
        type: DataTypes.STRING(30),
        allowNull: false
    },
    Description: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    IdList: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tb_list',
            key: 'id'
        }
    },
    Color: {
        type: DataTypes.STRING(7),
        allowNull: true
    },
    Priority: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    Completed: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'tb_task',
    timestamps: false  // Se não houver colunas de timestamps
});

// Associação entre tb_task e tb_list
Task.belongsTo(List, { foreignKey: 'IdList' });
List.hasMany(Task, { foreignKey: 'IdList' });

module.exports = Task;
