//Pegando as propriedades nativas da classe Error do Node
class ValueNotSupported extends Error {
  constructor(contentType) {
    //Chamando o construtor de error através do super
    super(`The content type ${contentType} is not supported`);
    this.name = "ValueNotSupported",
    this.idError= 3
  }
}

module.exports = ValueNotSupported;