const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const response = require('../lib/response_handler');
const jwt = require('jsonwebtoken');

const all = async (req, res) => {

  const users = await User.find();

  res.send({
    error: false,
    message: `All users from the database`,
    users: users
  });
};

const byId = async (req, res) => {

  const users = await User.findById(req.params.id);

  res.send({
    error: false,
    message: `User with id #${users._id}, has been fetched`,
    users: users
  });
};

const register = async (req, res) => {

  try {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return response(res, 400, 'Bad request');
    }

    req.body.password = bcrypt.hashSync(req.body.password);

    user = await User.create(req.body);

    response(res, 201, 'New user has been created', { user });
  } catch (error) {
    return response(res, 500, error.msg)
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        // token = plain data (JSON payload) + secret key za potpisuvanje na token + config options
        const payload = {
          id: user._id,
          email: user.email,
          name: user.name
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
          expiresIn: '50m'
        });

        response(res, 200, 'You have logged in successfully', { token })
      } else {
        response(res, 401, 'Invalid credentials');
      }
    } else {
      response(res, 401, 'Invalid credentials');
    }
  } catch (error) {
    response(res, 500, error.msg);
  }
}

const update = async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, req.body);
  const user = await User.findById(req.params.id);

  res.send({
    error: false,
    message: `User with id #${user._id} has been updated`,
    user: user
  });
};

const remove = async (req, res) => {

  await User.findByIdAndDelete(req.params.id);

  res.send({
    error: false,
    message: `User with id #${req.params.id} has been deleted`
  });
}; 

module.exports = {
  all,
  byId,
  register,
  login,
  update,
  remove
}