/*Esse arquivo tem como função, juntos com as funções nativa dos sequelize,
criar as tabelas automaticamente 

    LEMBRETE: DEVEMOS CHAMAR ESSA FUNÇÃO SOMENTE UMA VEZ PARA QUE SEJA CRIADA 
    AS TABELAS, TEMOS QUE, MANUALMENTE, NO TERMINAL COM O SEGUINTE COMANDO:
        - node api/database/createTables.js
    
*/

const models = [
    require("../routes/supplier/ModelSupplierTable"),
    require("../routes/supplier/product/ModelProductTable")
];

/*A partir do modelo criado, nós vamos criar automaticamente
essa tabela no nosso banco de dados configurado */
async function createTables() {
    /*Como temos mais de uma tabela a ser gerada devemos, a partir das modelos das tabelas exportadas na lista models,
    passar uma por uma para realizar a criação automática*/
    for(count in models) {
        const model = models[count];
        await model
            .sync()
            .then(() => console.log("Table created successfully!"))
            .catch(err => console.log("An error occurred: ", err))
    };
};

createTables();