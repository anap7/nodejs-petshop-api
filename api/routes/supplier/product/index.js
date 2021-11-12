//Juntar as duas rotas de supplier e product para que possamos passar o id do produto via url
const router = require("express").Router({ mergeParams: true });
const productTable = require("./QueryProductTable");
const Product = require("./Product");

//Configurando as permissões de requisição 
router.options("/", (req, res) => {
  res.set("Access-Control-Allow-Methods", "GET, POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});

router.get("/", async (req, res) => {
  /*O req.supplier.id passado como parâmetro é o reaproveitamento do resultado
  da verificação do fornecedor no middleware que criamos na função checkSupplier ao
  buscar pelo id do fornecedor inserido na url */
  const products = await productTable.list(req.supplier.id);
  //const products = await productTable.list(req.params.idSupplier);
  res.send(JSON.stringify(products));
});

router.post("/", async (req, res, next) => {
  try {
    const id = req.params.idSupplier;
    const data = req.body;
    const obj = Object.assign({}, data, { supplier: id });

    //Passando para o construtor
    const product = new Product(obj);
    await product.create();

    //Enriquecendo as respostas com a versão do documento
    res.set('ETag', product.version); //ETag representa a versão
    const timestamp = (new Date(product.updatedAt)).getTime();
    res.set('Last-Modified', timestamp); //última vez que foi alterado
    res.set('Location', `/api/suppliers/${product.supplier}/product/${product.id}`);//Mostrando o caminho da api
    res.status(201);
    res.send(product);
  } catch (error) {
    //Chamando o middleware de erros
    next(error);
  }
});

//Configurando as permissões de requisição com ids na url
router.options("/:id", (req, res) => {
  res.set("Access-Control-Allow-Methods", "DELETE, GET, HEAD, PUT");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});

router.delete("/:id", async (req, res) => {
  const obj = {
    id: req.params.id,
    supplier: req.params.idSupplier,
  };

  const product = new Procut(obj);
  await product.delete();

  res.status(204);
  res.end();
});

router.get("/:id", async (req, res, next) => {
  try {
    const data = {
      id: req.params.id,
      supplier: req.params.idSupplier,
    }
  
    //Inserindo os dados no contrutor
    const product = new Product(data);
    await product.getById();

    //Enriquecendo as respostas com a versão do documento
    res.set('ETag', product.version); //ETag representa a versão
    const timestamp = (new Date(product.updatedAt)).getTime();
    res.set('Last-Modified', timestamp); //última vez que foi alterado
    res.status(200);
    res.send(JSON.stringify(product));
    
  } catch (error) {
    next(error);
  }
});

router.head("/:id", async (req, res, next) => {
  try {
    const data = {
      id: req.params.id,
      supplier: req.params.idSupplier,
    }
  
    //Inserindo os dados no contrutor
    const product = new Product(data);
    await product.getById();

    //Enriquecendo as respostas com a versão do documento
    res.set('ETag', product.version); //ETag representa a versão
    const timestamp = (new Date(product.updatedAt)).getTime();
    res.set('Last-Modified', timestamp); //última vez que foi alterado
    res.status(200);
    res.end();
    
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const data = Object.assign(
      {},
      req.body,
      {
        id: req.params.id,
        supplier: req.params.idSupplier,
      }
    );

    const product = new Product(data);
  
    await product.update();
    await product.getById();

    //Enriquecendo as respostas com a versão do documento
    res.set('ETag', product.version); //ETag representa a versão
    const timestamp = (new Date(product.updatedAt)).getTime();
    res.set('Last-Modified', timestamp); //última vez que foi alterado
    res.status(204); 
    res.end();
    
  } catch (error) {
    next(error);
  }
});

//Configurando as permissões de requisição com ids na url
router.options("/:id/decrease-stock", (req, res) => {
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.status(204);
  res.end();
});

router.post("/:id/decrease-stock", async (req, res, next) => {
  try {
    const product = new Product({
      id: req.params.id,
      supplier: req.params.idSupplier,
    });

    await product.getById();
    product.stock = product.stock - req.body.quantity;
    await product.decreaseStock();
    await product.getById();
    
    //Enriquecendo as respostas com a versão do documento
    res.set('ETag', product.version); //ETag representa a versão
    const timestamp = (new Date(product.updatedAt)).getTime();
    res.set('Last-Modified', timestamp); //última vez que foi alterado
    res.status(204);
    res.end();
  } catch (error) {
    next(error);
  }
});


module.exports = router;
