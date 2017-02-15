var express = require('express'),
  router = express.Router(),
  db = require('../models');

module.exports = function (app) {
  app.use('/api', router);
};

router.get('/diagram/:diagramId', function (req, res, next) {
  res.send(req.params)
});

router.post('/diagram/:diagramId', function (req, res, next) {
  res.send(req.params)
});

router.put('/diagram/', function (req, res, next) {
  res.send(req.params)
});

router.get('/diagrams/', function (req, res, next) {
  db.Diagram.findAll().then(function (diagrams) {
    res.send(diagrams);
  });
});
