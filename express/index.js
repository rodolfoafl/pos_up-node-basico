const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

let users = [
  {
    id: 1,
    login: "rodolfoafl",
    password: "123456",
  },
  {
    id: 2,
    login: "rodolfoleal",
    password: "321654",
  },
];

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
 * USERS
 */
app.get("/users", (req, res) => {
  const { login } = req.query;
  if (login) {
    const filteredUsers = users.filter((u) => u.login.includes(login));
    res.status(200).json(filteredUsers);
  } else {
    res.status(200).json(users);
  }
});

app.post("/users", (req, res) => {
  let data = req.body;

  users.push(data);

  res.send("Usuário inserido com sucesso.");
});

app.put("/users", (req, res) => {
  res.send("Usuário alterado com sucesso.");
});

app.delete("/users", (req, res) => {
  res.send("Usuário removido com sucesso.");
});

/**
 * BOOKS
 */
app.get("/books", (req, res) => {
  res.status(200).json(books);
});

app.get("/books/total-quantity", (req, res) => {
  const totalQuantity = books.reduce((acc, book) => {
    return acc + book.quantity;
  }, 0);
  res
    .status(200)
    .send(`Quantidade total de livros no acervo: ${totalQuantity}`);
});

app.post("/books", (req, res) => {
  let data = req.body;

  books.push(data);

  res.send("Livro inserido com sucesso.");
});

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
    return res.status(200).json("Livro alterado com sucesso");
  }
  return res
    .status(404)
    .json("Livro não encontrado! Tente novamente com outro ID.");
});

app.delete("/books/:id", (req, res) => {
  let id = req.params.id;
  let toDelete = books.find((v) => v.id === Number(id));
  if (toDelete) {
    books = books.filter((v) => v.id !== Number(id));
    return res.status(200).json("Livro removido com sucesso");
  }
  return res
    .status(404)
    .json("Livro não encontrado! Tente novamente com outro ID.");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
