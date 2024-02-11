<p align="center">
  <a href="" rel="noopener">
 <img src="" alt="" style="width: 400px; height: auto;">
</p>

<h3 align="center">Playfieldz</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-active-success.svg)]()
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr/kylelobo/The-Documentation-Compendium.svg)](https://github.com/kylelobo/The-Documentation-Compendium/pulls)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](/LICENSE)

</div>

---

<p align="center">Backend da aplicação Playfieldz
    <br>
</p>

## 📝 Índice

- [Sobre a aplicação](#sobre)
- [Por onde começar?](#inicio)
- [Testes](#testes)
- [Swagger](#swagger)
- [Tecnologias utilizadas](#techs)
- [Requisitos](./REQUIREMENTS.md)
- [Autores](#autores)

## 🧐 Sobre a aplicação <a name = "sobre"></a>

O desafio consiste em um programa que auxilia turistas a encontrar a rota de viagem mais econômica entre dois pontos, considerando diversas conexões. O usuário fornece as rotas e seus respectivos custos através de um arquivo CSV. O programa oferece duas interfaces: uma de console e outra REST.

## 🏁 Por onde começar? <a name = "inicio"></a>

A aplicação foi desenvolvida com Typescript e Node.js, utilizando sempre os padrões e boas práticas de desenvolvimento.

### Pré-requisitos

- Node.js (v18+)
- NPM (v9+) ou Yarn

### Instalando as dependências

Para instalar as dependências do projeto, abra o prompt no diretório raiz e execute o comando:

```bash
# Utilizando o NPM
npm install

# Ou utilizando o Yarn
yarn
```

Recomendo a utilização do yarn por questões de performance.

## ✅ Testes <a name = "testes"></a>

Como na maioria das aplicações node.js, foi utilizado o `Jest` para a escrita dos testes unitários. Todos os testes encontram-se no diretório `tests` que está na raíz. Você pode executa-los através do seguinte comando:

```bash
# npm
npm run test

# yarn
yarn test
```

Se precisar analisar a cobertura de código, execute:

```bash
# npm
npm run test:coverage

# yarn
yarn test:coverage
```

Será gerada na raiz do projeto uma pasta chamada `coverage`. Dentro dela, você pode acessar o arquivo `coverage/lcov-report/index.html` para acessar o painel de cobertura de código.

## 📚 Swagger <a name = "swagger"></a>

Com a aplicação na interface REST em execução, você pode acessar a documentação dos recursos da API acessando o endereço *http://localhost:{porta}/api-docs*, onde `porta` é a porta configurada na aplicação. Por padrão a porta é **3333**.

http://localhost:3333/api-docs

## ⛏️ Tecnologias utilizadas <a name = "techs"></a>

- [Node.js](https://nodejs.org/en) - Open-source, cross-platform JavaScript runtime environment
- [Typescript](https://www.typescriptlang.org/) - Superset JavaScript


## ✍️ Autores <a name = "autores"></a>

- [@robertotics4](https://github.com/robertotics4)
