const Model = require("./ModelSupplierTable");
const NotFound = require("../../errors/NotFound");

module.exports = {
  list() {
    /*A função findAll é uma função disponibilizada pelo Sequelize que,
    a partir do nosso Model criado e acessando a tabela através dele,
    nós iremos fazer um "select * from" */
    return Model.findAll({ raw: true }); //Retorna somente o resultado da query
  },

  insert(supplier) {
    return Model.create(supplier);
  },

  async getById(id) {
    const resultFound = await Model.findOne({
      where: { id }
    });

    if (!resultFound) {
      //Ao invés de fazer a instância da classe nativa de Erros do node, criamos a nossa
      throw new NotFound("Supplier");
    }

    return resultFound;
  },

  update(id, dataToUpdate) {
    return Model.update(dataToUpdate, {
      where: { id },
    });
  },

  delete(id) {
    return Model.destroy({
      where: { id }
    })
  }
};
