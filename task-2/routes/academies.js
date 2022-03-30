var express = require('express');
var router = express.Router();
const controller = require('../controllers/academies');
const jwt = require('express-jwt');
const response = require('../lib/response_handler');

require('dotenv').config();

router.use(jwt({
      secret: process.env.JWT_SECRET_KEY,
      algorithms: ['HS256'] 
}).unless({
      path: [
            {
                  url: '/academies', methods: ['GET']
            }
      ]
}));

router.use((err, req, res, next) => {
      console.log(err.name);
      if (err.name === 'UnauthorizedError') {
            response(res, 401, 'Unauthorized access');
      }
})

router.get('/', controller.all)
      .post('/', controller.create)
      .get('/:id', controller.byId)
      .post('/:id/update', controller.update)
      .delete('/:id', controller.remove)

module.exports = router;


