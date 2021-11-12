const Model = require("./ModelProductTable");
const NotFound = require("../../../errors/NotFound");

module.exports = {
  /*Aqui estamos buscando o produto a partir do id do fornecedor */
  list(supplierId) {
    return Model.findAll({
      where: {
        supplier: supplierId
      }
    });
  },

  insert(data) {
    return Model.create(data);
  },

  delete(productId, supplierId) {
    return Model.destroy({
      //Deleter somente se existir o id do produto e fornecedor passsado para o construtor
      where: {
        id: productId,
        supplier: supplierId
      }
    });
  },

  async getById(productId, supplierId) {
    const found = await Model.findOne({
      where: {
        id: productId,
        supplier: supplierId
      },
      raw: true //Retorna os valores encontrados em JS purO.
    });

    if(!found) {
      throw new NotFound('Product');
    }

    return found;
  },

  async update(productData, dataToUpdate) {
    return Model.update(
      dataToUpdate, 
      {
        where: productData
      }
    )
  }, 

  async decrease(productId, supplierId, quantity) {
    return Model.update(
      {stock: quantity}, 
      {
        where: {
          id: productId,
          supplier: supplierId
        }
      }
    )
  } 
}