<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# User Management API

API para gerenciamento de usuários com autenticação JWT, criada para cadastro, autenticação e gestão de perfis de usuários.

## Funcionalidades

- Cadastro de usuários
- Autenticação com JWT
- Visualização de perfil do usuário
- Listagem paginada de usuários
- Atualização de nome e senha
- Exclusão de conta
- Criptografia de senha
- Persistência de dados em PostgreSQL
- Paginação automática (15 itens por página)

## Regras de Negócio (RN)

- Campos obrigatórios no cadastro: `name`, `email`, `password`
- `createdAt` é opcional (gerado automaticamente se não fornecido)
- Não é permitido cadastrar e-mails duplicados

## Requisitos Funcionais (RF)

1. Cadastrar usuário
2. Autenticar usuário
3. Visualizar dados do usuário
4. Listar todos os usuários (paginado)
5. Atualizar nome do usuário
6. Atualizar senha do usuário
7. Excluir usuário

## Requisitos Não-Funcionais (RNF)

- Senhas armazenadas com criptografia bcrypt
- Banco de dados PostgreSQL para persistência
- Paginação padrão de 15 registros por página
- Autenticação via JWT (JSON Web Token)

## Tecnologias Utilizadas

- NestJS
- Fastify
- PostgreSQL
- Prisma ORM
- JSON Web Token (JWT)
- Swagger (Documentação)

## Instalação

1. Clone o repositório:

````bash
git clone https://github.com/guieltorres/nestjs-clean-arch.git

## Project setup

```bash
$ npm install
````

## Compilar e executar o projeto

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Executar testes

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Recursos

- [Documentação do NestJS](https://docs.nestjs.com)
