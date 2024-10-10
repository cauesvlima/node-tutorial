const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    process.env.MYSQL_DATABASE_TODO, 
    process.env.MYSQL_USER, 
    process.env.MYSQL_PASSWORD_TODO, 
    {
        host: process.env.MYSQL_HOST_TODO,
        dialect: 'mysql',
        port: process.env.MYSQL_PORT || 3306, // Usando a porta da variável ou 3306 como padrão
    }
);

// Verifica se a conexão foi estabelecida com sucesso
sequelize.authenticate()
    .then(() => {
        console.log('Conexão TODO estabelecida com sucesso.');
    })
    .catch(err => {
        console.error('Erro ao conectar ao banco de dados:', err);
    });

module.exports = sequelize;