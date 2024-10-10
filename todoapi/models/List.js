const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Modelo para a tabela tb_list
const List = sequelize.define('tb_list', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    Nome: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    tableName: 'tb_list',
    timestamps: false  // Se não houver colunas de timestamps
});

module.exports = List;
