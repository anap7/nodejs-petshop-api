const InvalidField = require("../../errors/Invalid");
const DataNotProvided = require("../../errors/DataNotProvided");
const supplierTable = require("./QuerySupplierTable");

class Supplier {
  constructor({ id, company, email, type, createAt, updatedAt, version }) {
      this.id = id,
      this.company = company,
      this.email = email,
      this.type = type,
      this.createAt = createAt,
      this.updatedAt = updatedAt,
      this.version = version;
  }

  async create() {
    //Verificando antes
    this.checkValues();
    //Inserindo os valores na tabela
    const result = await supplierTable.insert({
      company: this.company,
      email: this.email,
      type: this.type,
    });

    //Recuperando os valores inseridos automaticamente após a inserção
      this.id = result.id,
      this.createdAt = result.createdAt,
      this.updatedAt = result.updatedAt,
      this.version = result.version;
  }

  //Recuperar por id
  async getById() {
    const supplierFound = await supplierTable.getById(this.id);

    this.company = supplierFound.company,
    this.email = supplierFound.email,
    this.type = supplierFound.type,
    this.createAt = supplierFound.createAt,
    this.updatedAt = supplierFound.updatedAt,
    this.version = supplierFound.version;
  }

  //Atualizar por id
  async update() {
    await supplierTable.getById(this.id);
    //Lista de verificação de campos
    const fields = ["company", "email", "type"];
    const updatedData = {};

    fields.forEach((field) => {
      /*Verificando através da lista de campos, os valores
      recebidos pelo objeto, substituindo o real valor
      recebido pelos campos definidos pela lista*/
      const value = this[field];

      if (typeof value === "string" && value.length > 0) {
        //Adicionando valor válido ao objeto atualizado
        updatedData[field] = value;
      }
    });

    if (Object.keys(updatedData).length === 0) {
      throw new DataNotProvided();
    }

    await supplierTable.update(this.id, updatedData);
  }

  //Deletar por id
  async delete() {
    return supplierTable.delete(this.id);
  }

  checkValues() {
    const fields = ["company", "email", "type"];

    fields.forEach(field => {
      const value = this[field];
      if (typeof value !== "string" || value.length === 0) {
        //Classificando o nosso erro e passando o campo para o construtor
        throw new InvalidField(field);
      }
    });
  }
}

module.exports = Supplier;
