const axios = require("axios");

let books = [
  {
    id: 1,
    name: "Duna",
    quantity: 4,
  },
  {
    id: 2,
    name: "Messias de Duna",
    quantity: 2,
  },
  {
    id: 3,
    name: "Filhos de Duna",
    quantity: 1,
  },
];

module.exports = () => {
  /**
   * BOOKS
   */

  const controller = {};

  //Lista todos os livros OU filtra por nome, usando query (?name=)
  controller.list = (req, res) => {
    const { name } = req.query;
    if (name) {
      const filteredBooks = books.filter((u) => u.name.includes(name));
      res.status(200).json(filteredBooks);
    } else {
      res.status(200).json(books);
    }
  };

  //Exibe a quantidade total de livros
  controller.getQuantity = (req, res) => {
    const totalQuantity = books.reduce((acc, book) => {
      return acc + book.quantity;
    }, 0);
    res
      .status(200)
      .send(`Quantidade total de livros no acervo: ${totalQuantity}`);
  };

  //Busca por nome e retorna os 10 primeiros resultados, utilizando a API OpenLibrary.org (https://openlibrary.org/developers)
  controller.fetchByName = async (req, res) => {
    const { name } = req.body;
    if (!name) {
      return res.status(404).send("Nome inválido, tente novamente.");
    }

    try {
      const results = await axios.get(
        `http://openlibrary.org/search.json?title=${name}`
      );
      let firstTen = [];
      results.data.docs.map((item, index) => {
        if (index < 10) {
          firstTen.push(item.title);
        }
      });
      return res.status(200).json({ firstTenResults: firstTen });
    } catch (error) {
      console.error(error);
    }
  };

  //Adiciona um livro
  controller.insert = (req, res) => {
    const data = req.body;
    if (data && data.name && data.quantity) {
      const { name, quantity } = data;

      const newId = books[books.length - 1].id + 1;
      let newBook = {
        id: newId,
        name,
        quantity,
      };
      books.push(newBook);
      return res.status(200).send("Livro inserido com sucesso.");
    } else {
      return res
        .status(404)
        .send(
          "Dados insuficientes para inclusão de novo livro! Tente novamente."
        );
    }
  };

  //Atualiza um livro
  controller.update = (req, res) => {
    const { name, quantity } = req.body;
    let id = req.params.id;
    let toUpdate = books.find((v) => v.id === Number(id));
    if (toUpdate) {
      if (name) {
        toUpdate.name = name;
      }
      if (quantity) {
        toUpdate.quantity = quantity;
      }
      return res.status(200).send("Livro alterado com sucesso");
    }
    return res
      .status(404)
      .send("Livro não encontrado! Tente novamente com outro ID.");
  };

  //Remove um livro
  controller.remove = (req, res) => {
    let id = req.params.id;
    let toDelete = books.find((v) => v.id === Number(id));
    if (toDelete) {
      books = books.filter((v) => v.id !== Number(id));
      return res.status(200).send("Livro removido com sucesso");
    }
    return res
      .status(404)
      .send("Livro não encontrado! Tente novamente com outro ID.");
  };

  return controller;
};
