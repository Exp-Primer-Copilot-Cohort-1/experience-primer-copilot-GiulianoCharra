// Create web server
var express = require('express');
var router = express.Router();
var db = require('../models/db');

// Get all comments
router.get('/', function(req, res){
    db.Comment.findAll().then(function(comments){
        res.json(comments);
    });
});

// Get comment by id
router.get('/:id', function(req, res){
    db.Comment.findById(req.params.id).then(function(comment){
        res.json(comment);
    });
});

// Create comment
router.post('/', function(req, res){
    db.Comment.create({
        name: req.body.name,
        content: req.body.content,
        postId: req.body.postId
    }).then(function(comment){
        res.json(comment);
    });
});

// Update comment
router.put('/:id', function(req, res){
    db.Comment.findById(req.params.id).then(function(comment){
        if(comment){
            comment.update({
                name: req.body.name,
                content: req.body.content,
                postId: req.body.postId
            }).then(function(comment){
                res.json(comment);
            });
        } else {
            res.json({error: 'Comment not found'});
        }
    });
});

// Delete comment
router.delete('/:id', function(req, res){
    db.Comment.findById(req.params.id).then(function(comment){
        if(comment){
            comment.destroy().then(function(){
                res.json({success: true});
            });
        } else {
            res.json({error: 'Comment not found'});
        }
    });
});

module.exports = router;
