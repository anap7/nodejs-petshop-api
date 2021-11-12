# PETSHOP API

API criada durando os dois cursos realizados na plataforma Alura
- NodeJS: Crie uma API REST padronizada e escalável
- NodeJS: Avançando em APIs REST com controle de versões

## Configurando os dados do banco
Crie uma pasta na raiz do projeto chamada **config** e dentro dela um arquivo chamado **default.json** 
(config/default.json) e insira as configurações abaixo dentro do arquivo:

```
{
   "mysql":{
      "database":"nome do seu banco de dados",
      "user":"seu usuário do banco",
      "password":"sua senha do banco",
      "host":"endereço do banco"
   },
   "api":{
      "port": número da porta (3000, por exemplo)
   }
}
```    
## Atualizando dependências :zap:
    npm install
    
## Iniciando o projeto :zap:
    npm start

## Rotas de teste
Faça o import do arquivo rotasDeTeste.json no Insomnia para testar todas as rotas da API.