const express = require("express");
const router = express.Router();
const pets = require("../services/pets");

router.get("/", async function (req, res, next) {
  try {
    res.json(await pets.read());
  } catch (err) {
    console.error(`Error while getting pets `, err.message);
    next(err);
  }
});

router.post("/", async function (req, res, next) {
  try {
    res.json(await pets.create(req.body));
  } catch (err) {
    console.error(`Error while posting pets `, err.message);
    next(err);
  }
});

router.put("/:id", async function (req, res, next) {
  try {
    let id = req.params.id;
    res.json(await pets.update(id, req.body));
  } catch (err) {
    console.error(`Error while posting pets `, err.message);
    next(err);
  }
});

module.exports = router;
