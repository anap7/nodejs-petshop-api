const express = require("express");
const app = express();
/*O config.json pode ser acessado em qualquer parte do projeto */
const config = require("config");
const router = require("./routes/supplier");
const routerV2 = require("./routes/supplier/routes.v2");

//Classes para classificação de erros
const NotFound = require("./errors/NotFound"); 
const InvalidField = require("./errors/Invalid");
const DataNotProvided = require("./errors/DataNotProvided");
const ValueNotSupported = require("./errors/ValueNotSupported");
const { acceptedFormat } = require("./Serializer");

//Para que a requisição receba o formato JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Verificando o tipo de formato da requisição
app.use((req, res, next) => {
  let requiredFormat = req.header('Accept');

  if (requiredFormat === '*/*') {
    requiredFormat = 'application/json';
  }

  /*Verificando se o formato da requisição está incluso na 
  nossa lista de formatos de requisição aceitos */
  if (acceptedFormat.indexOf(requiredFormat) === -1) {
    //Status de não aceito
    res.status(406).end();
    return;
  }

  //Inserido o tipo de conteúdo
  res.setHeader('Content-Type', requiredFormat);
  //Indo para o próximo middleware
  next();
});

//Configurando o CORS
app.use((req, res, next) => {
  res.set('Access-Control-Allow-Origin', '*');
  next();
});

//Aplicando nossas rotas voltadas para o fornecedor
app.use('/api/suppliers', router);
app.use('/api/v2/suppliers', routerV2);

app.use((error, req, res, next) => {
  let status = 500;
  //Verificando se o erro é uma instância de NotFound (Nossa classe de classificação de erros)
  if (error instanceof NotFound) {
    status = 404;
  } else if (error instanceof InvalidField || error instanceof DataNotProvided) {
    status = 400;
  } else if (error instanceof ValueNotSupported) {
    //Not Acceptable - não encontra nenhum conteúdo seguindo os critérios fornecidos pelo agente do usuário.
    status = 406;
  } else {
    status = 400;
  }

  res.status(status);
  res.send(
    JSON.stringify({
      idError: error.idError,
      message: error.message,
    })
  );
});

app.listen(config.get('api.port'), () => {
  console.log("It's running baby!");
});
