const ValueNotSupported = require("./errors/ValueNotSupported");

class Serializer {
  json (data) {
    return JSON.stringify(data);
  }

  serialize (data) {
    if (this.contentType === 'application/json') {
      return this.json(this.filter(data));
    }

    throw new ValueNotSupported();
  }

  //Retornar para o usuário somente os campos públicos
  filterObjects (data) {
    const newObject = {};
    const publicFields = ['id', 'company', 'type'];

    publicFields.forEach(field => {
      if (data.hasOwnProperty(field)) {
        newObject[field] = data[field];
      }
    });

    return newObject;
  }

  filter (data) {
    if (Array.isArray(data)) {
      data = data.map(item => {
        return this.filterObjects(item);
      });
    } else {
      data = this.filterObjects(data);
    }

    return data;
  } 
}

module.exports = {
  Serializer: Serializer, 
  acceptedFormat: ['application/json']
}
