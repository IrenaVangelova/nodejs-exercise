const Faculty = require('../models/faculty');
const University = require('../models/university');

const all = async (req, res) => {

  const faculties = await Faculty.find().populate('university', 'name');

  res.render('faculties/index', { faculties });
};

const getCreate = async (req, res) => {
  const universities = await University.find();

  res.render('faculties/create', { universities });
};

const postCreate = async (req, res) => {

  if(req.body.university == ""){
    req.body.university = null;
  }

  const faculty = await Faculty.create(req.body);

  if(req.body.university){
    await University.findByIdAndUpdate(req.body.university), {
      $push: { faculties: faculty }
    }
  }

  res.redirect('/faculties');
};

const getUpdate = async (req, res) => {
  const faculty = await Faculty.findById(req.params.id).populate('university');
  const university = await University.find();

  res.render(`faculties/edit`, { faculty, university });
};

const getView = async (req, res) => {
  const faculty = await Faculty.findById(req.params.id).populate('university');

  res.render(`faculties/view`, { faculty });
};

const postUpdate = async (req, res) => {

  if(req.body.university == ""){
    req.body.university = null;
  }

  const faculty = await Faculty.findByIdAndUpdate(req.params.id, req.body);

  if(req.body.university){

    let foundFaculties = await University.find({ faculties: faculty })

    if(foundFaculties.length == 0){
      await University.findByIdAndUpdate(req.body.university), {
        $push: { faculties: faculty }
      }
    }
  }

  res.redirect(`/faculties`);
};

const getDeleted = async (req, res) => {
  await Faculty.findByIdAndDelete(req.params.id);

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