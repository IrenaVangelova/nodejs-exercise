const express = require('express');
const router = express.Router();
const controller = require('../controllers/universities');

router.get('/', controller.all)
      .get('/create', controller.getCreate)
      .get('/:id', controller.getUpdate)
      .post('/', controller.postCreate)
      .post('/:id', controller.postUpdate)
      .delete('/:id', controller.getDeleted)
      .get('/view', controller.getView)    

module.exports = router;