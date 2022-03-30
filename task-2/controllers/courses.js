const mongoose = require('mongoose');
const Course = require('../models/course');
const response = require('../lib/response_handler');
const Academy = require('../models/academy');

const all = async (req, res) => {

  const courses = await Course.find().populate('academy', '-courses');

  res.send({
    error: false,
    message: `All courses from the database`,
    courses: courses
  });
};

const byId = async (req, res) => {

  const courses = await Course.findById(req.params.id).populate('academy', '-courses');

  res.send({
    error: false,
    message: `Course with id #${courses._id}, has been fetched`,
    courses: courses
  });
};

const create = async (req, res) => {
    const course = await Course.create(req.body);

    await Academy.findByIdAndUpdate(req.body.academy, {
      $push: { courses: course._id },
    });

    response(res, 201, 'New course created', { course });
};

const update = async (req, res) => {
  await Course.findByIdAndUpdate(req.params.id, req.body);
  const course = await Course.findById(req.params.id);

  res.send({
    error: false,
    message: `Course with id #${course._id} has been updated`,
    course: course
  });
};


const remove = async (req, res) => {

  const course = await Course.findById(req.params.id);

  res.send({
    error: false,
    message: `Course with id #${req.params.id} has been deleted`
  });
}; 

module.exports = {
  all,
  byId,
  update,
  remove,
  create
}