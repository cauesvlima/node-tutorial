const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Caminho para a sua configuração de conexão

const Usuario = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true // Valida se o formato é de e-mail
        }
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    dataCriacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'usuarios', // Nome da tabela no banco de dados
    timestamps: false // Se quiser desabilitar os timestamps automáticos (createdAt, updatedAt)
});

module.exports = Usuario;
