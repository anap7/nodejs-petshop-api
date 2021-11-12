const Sequelize = require('sequelize');
const database = require('../../database');

/*Esse arquivo tem a função de configurar o modelo da tabela de fornecedor.
Isso fica bem definido ao invés de criar uma tabela manualmente com todas
as regras*/

const colums = {
  company: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  },
  type: {
    type: Sequelize.ENUM('Toys', 'Food', 'Medicine'),
    allowNull: false
  }
}

//Coluna de configuração da tabela
/*Registros que serão automático a cada cadastro */
const options = {
  freezeTableName: true, //Para que não seja modificado sempre o nome da tabela ao instanciar o modelo
  tableName: 'supplier',
  timestamps: true, //Data de criação da tabela
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  version: 'version'
}

/*Criando um modelo que vai conter as informações do nosso mapeamento objeto-relacional, ou seja, 
o código JavaScript que vai representar uma tabela do banco de dados.*/
module.exports = database.define('supplier', colums, options);