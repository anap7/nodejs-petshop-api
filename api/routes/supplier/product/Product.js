const productTable = require("./QueryProductTable");
const DataNotProvided = require("../../../errors/DataNotProvided");
const InvalidField = require("../../../errors/Invalid");

class Product {
  constructor({
    id,
    title,
    price,
    stock,
    supplier,
    createdAt,
    updatedAt,
    version,
  }) {
    (this.id = id),
      (this.title = title),
      (this.price = price),
      (this.stock = stock),
      (this.supplier = supplier),
      (this.createdAt = createdAt),
      (this.updatedAt = updatedAt),
      (this.version = version);
  }

  checkValues() {
    if (typeof this.title !== "string" || this.title.length === 0) {
      throw new InvalidField("title");
    }

    if (typeof this.price !== "number" || this.price === 0) {
      throw new InvalidField("price");
    }

    if (typeof this.stock !== "number") {
      throw new InvalidField("stock");
    }
  }

  async create() {
    //Verificando antes
    this.checkValues();
    //Inserindo os valores na tabela
    const result = await productTable.insert({
      title: this.title,
      price: this.price,
      stock: this.stock,
      supplier: this.supplier,
    });

    //Recuperando os valores inseridos automaticamente após a inserção
    (this.id = result.id),
      (this.createdAt = result.createdAt),
      (this.updatedAt = result.updatedAt),
      (this.version = result.version);
  }

  async delete() {
    return await productTable.delete(this.id, this.supplier);
  }

  async getById() {
    const product = await productTable.getById(this.id, this.supplier);

    this.title = product.title;
    this.price = product.price;
    this.stock = product.stock,
    this.createdAt = product.createdAt,
    this.updatedAt = product.updatedAt,
    this.version = product.version;
  }

  update() {
    const dataToUpdate = {};

    if (typeof this.title === "string" && this.title.length > 0) {
      dataToUpdate.title = this.title;
    }

    if (typeof this.price === "number" && this.price > 0) {
      dataToUpdate.price = this.price;
    }

    if (typeof this.stock === "number") {
      dataToUpdate.stock = this.stock;
    }

    if (Object.keys(dataToUpdate).length === 0) {
      throw new DataNotProvided();
    }

    return productTable.update(
      {
        id: this.id,
        supplier: this.supplier,
      },
      dataToUpdate
    );
  }

  decreaseStock() {
    return productTable.decrease(this.id, this.supplier, this.stock);
  }
}

module.exports = Product;
