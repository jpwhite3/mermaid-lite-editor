var express = require('express'),
    router = express.Router(),
    db = require('../models');

module.exports = function (app) {
    app.use('/api', router);
};

router.get('/diagram/:diagramId', function (req, res, next) {
    db.Diagram.findById(req.params.diagramId)
    .then(function(diagram) {
        if(!diagram){
            res.status(404).json({error: 'diagram not found'});
        }
        res.json(diagram);
    })
    .catch(function(error) {
        res.status(500).send(error);
    });
});

router.put('/diagram/:diagramId', function (req, res, next) {
    res.send(req.params)
});

router.delete('/diagram/:diagramId', function (req, res, next) {
    db.Diagram.destroy({
        where: {
            id: req.params.diagramId
        }
    }, function(err, diagram) {
        if (err){
            res.send(err);
        }
        res.json({ message: 'Successfully deleted' });
    });
});

router.post('/diagram/', function (req, res, next) {
    var diagram = db.Diagram.build({
        name: req.body.diagram_name,
        encoded_data: req.body.encoded_data
    });

    diagram.save().then(function(anotherTask) {
        res.json(diagram);
    }).catch(function(error) {
        res.send(error);
    });

});

router.get('/diagrams/', function (req, res, next) {
    db.Diagram.findAll().then(function (diagrams) {
        res.send(diagrams);
    });
});
