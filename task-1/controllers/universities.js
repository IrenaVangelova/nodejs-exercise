const University = require('../models/university');

const all = async (req, res) => {

  const universities = await University.find();

  res.render('universities/index', { universities });
};

const getCreate = async (req, res) => {

  res.render('universities/create');
};

const postCreate = async (req, res) => {
  await University.create(req.body);

  res.redirect('/universities');
};

const getUpdate = async (req, res) => {
  const university = await University.findById(req.params.id);

  res.render(`universities/edit`, { university });
};

const getView = async (req, res) => {
  const university = await University.findById(req.params.id).populate('university');

  res.render(`universities/view`, { university });
};

const postUpdate = async (req, res) => {
  await University.findByIdAndUpdate(req.params.id, req.body);

  res.redirect(`/universities`);
};

const getDeleted = async (req, res) => {
  await University.findByIdAndDelete(req.params.id);

  res.status(200).send({});
};



module.exports = {
  all,
  postCreate,
  getCreate,
  getView,
  getUpdate,
  postUpdate,
  getDeleted
}