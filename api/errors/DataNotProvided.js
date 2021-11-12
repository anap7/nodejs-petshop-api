//Pegando as propriedades nativas da classe Error do Node
class DataNotProvided extends Error {

  constructor() {
    super("Data were not provided for the update.")
    this.name = "DataNotProvided",
    this.idError = 2
  }
}

module.exports = DataNotProvided;