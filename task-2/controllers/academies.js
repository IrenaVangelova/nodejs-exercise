const mongoose = require('mongoose');
const Academy = require('../models/academy');
const response = require('../lib/response_handler');
const Course = require('../models/course');

const all = async (req, res) => {

  const acedemies = await Academy.find().populate('courses');

  res.send({
    error: false,
    message: `All acedemies from the database`,
    acedemies: acedemies
  });
};

const create = async (req, res) => {

  const academy = await Academy.create(req.body);
    
      res.send({
        error: false,
        message: 'New academy has been created',
        academy: academy
      });
};

const byId = async (req, res) => {

  const acedemies = await Academy.findById(req.params.id).populate('courses');

  res.send({
    error: false,
    message: `Academy with id #${acedemies._id}, has been fetched`,
    acedemies: acedemies
  });
};

const update = async (req, res) => {
  await Academy.findByIdAndUpdate(req.params.id, req.body);
  const academy = await Academy.findById(req.params.id);

  res.send({
    error: false,
    message: `Academy with id #${academy._id} has been updated`,
    academy: academy
  });
};

const remove = async (req, res) => {

  await Academy.findByIdAndDelete(req.params.id);

  res.send({
    error: false,
    message: `Academy with id #${req.params.id} has been deleted`
  });
}; 

module.exports = {
  all,
  byId,
  update,
  remove,
  create
}