const express = require("express");
const veterinarians = require("../services/veterinarians");

module.exports = () => {
  const veterinariansController = {};

  veterinariansController.list = async (req, res, next) => {
    try {
      res.json(await veterinarians.read());
    } catch (err) {
      console.error(`Error: ${err.message}`);
      next(err);
    }
  };

  veterinariansController.create = async (req, res, next) => {
    try {
      res.json(await veterinarians.create(req.body));
    } catch (err) {
      console.error(`Error: ${err.message}`);
      next(err);
    }
  };

  veterinariansController.update = async (req, res, next) => {
    try {
      let id = req.params.id;
      res.json(await veterinarians.update(id, req.body));
    } catch (err) {
      console.error(`Error: ${err.message}`);
      next(err);
    }
  };

  veterinariansController.remove = async (req, res, next) => {
    try {
      let id = req.params.id;
      res.json(await veterinarians.deleteFunc(id));
    } catch (err) {
      console.error(`Error: ${err.message}`);
      next(err);
    }
  };

  return veterinariansController;
};
