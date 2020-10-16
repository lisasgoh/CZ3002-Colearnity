var Post = require("../models/Post");

var express = require("express");
var searchRouter = express.Router();

// get post(s) based on search keywords post info - /api/search?searchString=(words)
searchRouter.get("/", (req, res) => {
    //console.log("search for keyword(s) received: " +req.query.searchString);
    str = new RegExp(".*" + req.query.searchString + ".*", "i");
    Post.find({
        $or: [
            {'title':  str },
            {'description':  str }
        ]
    }, function(err, post){
        if(err){
            res.send(err);
        } 
        else
            res.json(post);
    }
    );
});


module.exports = searchRouter;