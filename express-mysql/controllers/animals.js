const express = require("express");
const router = express.Router();
const animals = require("../services/animals");

module.exports = () => {
  const animalsController = {};

  animalsController.list = async (req, res, next) => {
    try {
      res.json(await animals.read());
    } catch (err) {
      console.error(`Error: ${err.message}`);
      next(err);
    }
  };

  animalsController.create = async (req, res, next) => {
    try {
      res.json(await animals.create(req.body));
    } catch (err) {
      console.error(`Error: ${err.message}`);
      next(err);
    }
  };

  animalsController.update = async (req, res, next) => {
    try {
      let id = req.params.id;
      res.json(await animals.update(id, req.body));
    } catch (err) {
      console.error(`Error: ${err.message}`);
      next(err);
    }
  };

  animalsController.remove = async (req, res, next) => {
    try {
      let id = req.params.id;
      res.json(await animals.deleteFunc(id));
    } catch (err) {
      console.error(`Error: ${err.message}`);
      next(err);
    }
  };

  return animalsController;
};
