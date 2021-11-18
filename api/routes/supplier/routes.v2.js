const router = require("express").Router();
const supplierTable = require("./QuerySupplierTable");
const { Serializer } = require("../../Serializer");

//Configurando as permissões de requisição
router.options("/", (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});

router.get("/", async (req, res) => {
  //Acessando nosso ORM da tabela supplier para listar todos os itens
  const results = await supplierTable.list();
  const serializer = new Serializer();
  /*Usando a nossa classe Serializer para retornar somente dados
   públicos vindos da listagem*/
  res.status(200).json(serializer.filter(results));
});

module.exports = router;