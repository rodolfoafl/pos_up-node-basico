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

let vehicles = [
  {
    id: 1,
    model: "Gol",
    brand: "VW",
  },
  {
    id: 2,
    model: "Ka",
    brand: "Ford",
  },
];

/**
 * USERS
 */
app.get("/users", (req, res) => {
  res.status(200).json(users);
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
 * VEHICLES
 */
app.get("/vehicles", (req, res) => {
  res.status(200).json(vehicles);
});

app.post("/vehicles", (req, res) => {
  let data = req.body;

  vehicles.push(data);

  res.send("Veículo inserido com sucesso.");
});

app.put("/vehicles/:id", (req, res) => {
  const { model, brand } = req.body;
  let id = req.params.id;
  let toUpdate = vehicles.find((v) => v.id === Number(id));
  if (toUpdate) {
    if (model) {
      toUpdate.model = model;
    }
    if (brand) {
      toUpdate.brand = brand;
    }
    return res.status(200).json("Veículo alterado com sucesso");
  }
  return res
    .status(404)
    .json("Veículo não encontrado! Tente novamente com outro ID.");
});

app.delete("/vehicles/:id", (req, res) => {
  let id = req.params.id;
  let toDelete = vehicles.find((v) => v.id === Number(id));
  if (toDelete) {
    vehicles = vehicles.filter((v) => v.id !== Number(id));
    return res.status(200).json("Veículo removido com sucesso");
  }
  return res
    .status(404)
    .json("Veículo não encontrado! Tente novamente com outro ID.");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
