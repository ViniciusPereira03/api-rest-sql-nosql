# API REST com SQL e NoSQL

Este projeto cria uma API REST que utiliza bancos de dados SQL e NoSQL para gerenciamento de dados.

O objetivo é implementar um serviço web capaz de operar com um banco de dados relacional (SQL) e um banco de dados não relacional (NoSQL) utilizando ORM e ODM.

## Tabelas e Collections
### SQL (MySQL)

O banco de dados SQL inclui as seguintes tabelas:

1. **Produtos**
   - `id` (INTEGER, Primary Key, Auto Increment)
   - `nome_produto` (VARCHAR)
   - `marca` (VARCHAR)
   - `categoria` (VARCHAR)
   - `created` (DATETIME)

2. **Listas**
   - `id` (INTEGER, Primary Key, Auto Increment)
   - `nome` (VARCHAR)
   - `descricao` (VARCHAR)
   - `data_compra` (DATETIME)
   - `created` (DATETIME)

3. **Itens**
   - `id` (INTEGER, Primary Key, Auto Increment)
   - `fk_lista` (INTEGER)
   - `fk_produto` (INTEGER)
   - `quantidade` (INTEGER)
   - `valor_unidade_produto` (FLOAT)
   - `created` (DATETIME)

### NoSQL (MongoDB)

O banco de dados NoSQL inclui as seguintes collections:

1. **Produtos**
   - `id` (Number, Required)
   - `nome_produto` (String)
   - `marca` (String)
   - `categoria` (String)
   - `created` (Date)

2. **Listas**
   - `id` (Number, Required)
   - `nome` (String)
   - `descricao` (String)
   - `data_compra` (Date)
   - `created` (Date)

3. **Itens**
   - `id` (Number, Required)
   - `fk_lista` (Number)
   - `fk_produto` (Number)
   - `quantidade` (Number)
   - `valor_unidade_produto` (Number)
   - `created` (Date)

## Tecnologias Utilizadas

- **Backend Framework:** Express
- **ORM para SQL:** Sequelize
- **ODM para NoSQL:** Mongoose
- **Banco de Dados SQL:** MySQL
- **Banco de Dados NoSQL:** MongoDB

## Configuração do Projeto

1. **Clonagem do Repositório**

    Clone o repositório para sua máquina local:

    ```bash
    git clone https://github.com/ViniciusPereira03/api-rest-sql-nosql.git
    cd api-rest-sql-nosql
    ```

2. **Instalação das Dependências**

    Instale as dependências necessárias para o projeto:

    ```bash
    npm install
    ```

3. **Configuração dos Bancos de Dados**
    - **MySQL**: Certifique-se de que o MySQL esteja em execução e configure o banco de dados conforme necessário.
    - **MongoDB**: Certifique-se de que o MongoDB esteja em execução.

4. **Execução do Servidor**

    Utilize o nodemon para iniciar o servidor e acompanhar alterações:

    ```bash
    nodemon server.js
    ```

## Endpoints

### SQL

- **POST /sql/produtos/add** - Adiciona um novo produto
- **GET /sql/produtos/view/:id** - Obtém um produto pelo ID
- **GET /sql/produtos/list** - Lista todos os produtos
- **PUT /sql/produtos/edit/:id** - Edita um produto pelo ID
- **DELETE /sql/produtos/delete/:id** - Remove um produto pelo ID

### NoSQL

- **POST /nosql/produtos/add** - Adiciona um novo produto
- **GET /nosql/produtos/view/:id** - Obtém um produto pelo ID
- **GET /nosql/produtos/list** - Lista todos os produtos
- **PUT /nosql/produtos/edit/:id** - Edita um produto pelo ID
- **DELETE /nosql/produtos/delete/:id** - Remove um produto pelo ID

## Testes
Para testar a API, utilize ferramentas como Postman ou o Visual Studio Code com a extensão REST Client para enviar requisições HTTP e verificar as respostas da API.
