var Post = require("../models/Post");
var Forum = require("../models/Forum");

var express = require("express");
var filterRouter = express.Router();

// get post(s) based on filter keywords post info - /api/filter?filter=(words)
filterRouter.get("/", (req, res) => {
    console.log("get request for forum name: "+req.query.filter);
    const filter = req.query.filter;

    //get forum id from forum name
    Forum.find({
        name: filter
    }, function(err, result){
    if(err)
        res.send(err);
    else
    {
        console.log("result from db:" +result[0]._id);
        Post.find({
            _forum: result[0]._id
        }, function(err, post){ 
        if(err)
            res.send(err);
        else
            res.json(post);
        })
    }
    })
});


module.exports = filterRouter;