const express = require("express");
const exams = require("../services/exams");

module.exports = () => {
  const examsController = {};

  examsController.list = async (req, res, next) => {
    try {
      res.json(await exams.read());
    } catch (err) {
      console.error(`Error while listing exams `, err.message);
      next(err);
    }
  };

  examsController.create = async (req, res, next) => {
    try {
      res.json(await exams.create(req.body));
    } catch (err) {
      console.error(`Error while creating exam `, err.message);
      next(err);
    }
  };

  examsController.update = async (req, res, next) => {
    try {
      let id = req.params.id;
      res.json(await exams.update(id, req.body));
    } catch (err) {
      console.error(`Error while posting exam `, err.message);
      next(err);
    }
  };

  examsController.remove = async (req, res, next) => {
    try {
      let id = req.params.id;
      res.json(await exams.deleteFunc(id));
    } catch (err) {
      console.error(`Error while deleting exam `, err.message);
      next(err);
    }
  };

  return examsController;
};
