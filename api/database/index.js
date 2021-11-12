const Sequelize = require('sequelize');
/*O config.json pode ser acessado em qualquer parte do projeto */
const config = require('config');

const instance = new Sequelize(
    config.get('mysql.database'), 
    config.get('mysql.user'),
    config.get('mysql.password'),
    
    {
        host: config.get('mysql.host'),    
        dialect: 'mysql'
    }
);

module.exports = instance;
