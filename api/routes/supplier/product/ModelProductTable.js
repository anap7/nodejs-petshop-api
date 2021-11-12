const Sequelize = require('sequelize');
const database = require('../../../database');

const colums = {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DOUBLE,
    allowNull: false
  },
  stock: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  supplier: {
    type: Sequelize.INTEGER,
    allowNull: false,
    references: { //Aqui estamos fazendo a foreing key da tabela, precisando passar o modelo da tabela referenciada que é o supplier e a chave de referência que é o id
      model: require('../ModelSupplierTable'),
      key: 'id'
    }
  }
};

//Coluna de configuração da tabela
/*Registros que serão automático a cada cadastro */
const options = {
  freezeTableName: true, //Para que não seja modificado sempre o nome da tabela ao instanciar o modelo
  tableName: 'product',
  timestamps: true, //Data de criação da tabela
  createdAt: "createdAt",
  updatedAt: "updatedAt",
  version: 'version'
};

/*Criando um modelo que vai conter as informações do nosso mapeamento objeto-relacional, ou seja, 
o código JavaScript que vai representar uma tabela do banco de dados.*/
module.exports = database.define('product', colums, options);