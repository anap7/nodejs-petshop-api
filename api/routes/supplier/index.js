const router = require("express").Router();
const supplierTable = require("./QuerySupplierTable");

//Modelo classe de fornecedor
const Supplier = require("./Supplier");
const { Serializer } = require("../../Serializer");

//Configurando as permissões de requisição
router.options("/", (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});

//Listagem de todos
router.get("/", async (req, res) => {
  //Acessando nosso ORM da tabela supplier para listar todos os itens
  const results = await supplierTable.list();
  const serializer = new Serializer();
  /*Usando a nossa classe Serializer para retornar somente dados
   públicos vindos da listagem*/
  res.status(200).json(serializer.filter(results));
});

//Cadastro de fornecedor
/*No terceiro parâmetro inserimos o next, que seria o próximo middleware
que declaramos na pasta raiz da nossa api (index.js), onde será validado os 
erros */
router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    //Instanciando a classe e passando diretamente no construtor
    const supplier = new Supplier(data);

    await supplier.create();

    res.status(201).json(supplier);
  } catch (error) {
    next(error);
  }
});

//Configurando as permissões de requisição com ids na url
router.options("/:id", (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});

router.get("/:supplierId", async (req, res) => {
  try {
    const id = req.params.supplierId;
    //Instanciando a classe e passando diretamente no construtor
    const supplier = new Supplier({ id });

    await supplier.getById();

    const serializer = new Serializer();
    /*Usando a nossa classe Serializer para retornar somente dados
    públicos vindos da listagem*/
    res.status(200).json(serializer.filter(supplier));
    //res.send(JSON.stringify(supplier));
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

/*No terceiro parâmetro inserimos o next, que seria o próximo middleware
que declaramos na pasta raiz da nossa api (index.js), onde será validado os 
erros */
router.put("/:supplierId", async (req, res, next) => {
  try {
    const id = req.params.supplierId;
    const data = req.body;
    //Unindo as informações recebidas em um objeto

    //Instanciando a classe e passando diretamente no construtor
    const supplier = new Supplier({ id, ...data });

    //Verificando se existe o fornecedor a ser atualizado
    await supplier.update();

    //Retornando a classe atualizada - 204: Sucesso, mas sem conteúdo pra retornar
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

router.delete("/:supplierId", async (req, res, next) => {
  try {
    const id = req.params.supplierId;

    //Instanciando a classe e passando diretamente no construtor
    const supplier = new Supplier({ id });

    //Verificando se existe o fornecedor a ser deletado
    await supplier.getById();
    await supplier.delete();

    //Retornando a classe atualizada - 204: Sucesso, mas sem conteúdo pra retornar
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

/*O Supplier (fornecedor) terá vários produtos dentro dele, portando, iremos inserir a 
rota Product dentro das rotas do fornecedor */
const routerProduct = require('./product');
//Primeiro parâmetro é o nome da rota, mas deixaremos vazio e o segundo os roteadores (todas as rotas voltadas para produto)
/*O caminho novo é esse agora:
  Nosso caminho inicial declarado na raiz da api: http://localhost:3000/api/suppliers/
  Agora, queremos acessar o produto dentro de cada fornecedor através do id, ficando assim as rotas para produto
  http://localhost:3000/api/suppliers/7/product/
*/

//Middleware para verificar o fornecedor
const checkSupplier = async (req, res, next) => {
  try {
    const id = req.params.idSupplier;
    //Passando o id do fornecedor para o construtor da classe
    const supplier = new Supplier({ id });
    await supplier.getById();
    //Depois de verificar passar para o próximo middleware
    /*Para aproveitamos que já buscamos as informações do fornecedor,
    nós vamos passar para a requisição o fornecedor encontrado, podendo
    utilizar essa requisição nas funções de produtos */
    req.supplier = supplier;
    next();
  } catch (error) {
    next(error);
  }
};

//Primeiro nós vamos verificar se o fornecedor existe antes de excutar as rotas de crud de produto
router.use('/:idSupplier/product', checkSupplier, routerProduct);

module.exports = router;
