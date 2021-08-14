const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

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

/**
 * BOOKS
 */

//Lista todos os livros OU filtra por nome, usando query (?name=)
app.get("/books", (req, res) => {
  const { name } = req.query;
  if (name) {
    const filteredBooks = books.filter((u) => u.name.includes(name));
    res.status(200).json(filteredBooks);
  } else {
    res.status(200).json(books);
  }
});

//Exibe a quantidade total de livros
app.get("/books/total-quantity", (req, res) => {
  const totalQuantity = books.reduce((acc, book) => {
    return acc + book.quantity;
  }, 0);
  res
    .status(200)
    .send(`Quantidade total de livros no acervo: ${totalQuantity}`);
});

//Adiciona um livro
app.post("/books", (req, res) => {
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
});

//Atualiza um livro
app.put("/books/:id", (req, res) => {
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
});

//Remove um livro
app.delete("/books/:id", (req, res) => {
  let id = req.params.id;
  let toDelete = books.find((v) => v.id === Number(id));
  if (toDelete) {
    books = books.filter((v) => v.id !== Number(id));
    return res.status(200).send("Livro removido com sucesso");
  }
  return res
    .status(404)
    .send("Livro não encontrado! Tente novamente com outro ID.");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
