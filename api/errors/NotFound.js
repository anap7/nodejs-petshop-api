//Pegando as propriedades nativas da classe Error do Node
class NotFound extends Error {
  constructor(name) {
    //Chamando o construtor de error através do super
    super(`${name} Not Found`);
    this.name = "Not Found",
    this.idError= 0
  }
}

module.exports = NotFound;