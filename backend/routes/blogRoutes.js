const router = require('express').Router();
const Blog = require('../models/blogModel');
const bcrypt = require('bcrypt');
//add helmetJS for protection

router.route('/api/threads').get((req, res) => {
    Blog.find()
        .then(thread => res.json(thread) )
        .catch(err => console.log("Son : "  + err ))
});

router.route('/api/threads/:id').get((req, res) => {
    Blog.findById(req.params.id)
        .then(board => res.json(board))
        .catch(err => res.status(400).json("Error finding by id: "+ err))
});

router.route('/api/threads/create').post((req, res) => {
    bcrypt.hash(req.body.password, 12, function(err, hash){
        const newPost = new Blog({
            title: req.body.title,
            comment: req.body.comment,
            report: req.body.report,
            password: hash
        });
    newPost.save()
        .then(() => res.json("Post created succesfully!"))
        .catch(error => console.log('Error: ' + error));
   });
});


router.route('/api/threads/update/:id').put((req, res) => {
    //this route is needed to REPORT a thread made by other users.
    Blog.findOneAndUpdate(req.params.id)
        .then(thread => {
            thread.report = req.body.report;

            thread.save()
                .then(() => res.json('Repor created succesfully'))
                .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
});

router.route('/api/threads/delete/:id').delete((req, res) => {
    
    var myId = req.params.id
    var someOtherPassword = req.body.password;
     //still missing to add the bcrypt compare function to validate if
    //user input is the same password as the one in the db.
    Blog.findOne({'_id': myId})
        .then(thread =>{ 
            var hash = thread.password
            bcrypt.compare(someOtherPassword, hash)
            .then(response => {
                if(!response){
                    res.json("Wrong password")
                } else{
                    Blog.deleteOne({'_id': myId}, function(err){
                        if(err){
                            console.log("This comes from MONGOdb: " + err)
                        } else{
                            res.json("Thread deleted succesfully!")
                        }
                    })
                }
            })
            .catch(error => console.log("This comes from byCrypt: " + error))
        })
        .catch(error => res.status(400).json(error));
});



/*
*
* 
*
*
*
*
*
           THIS IS A DIVISON TO START NEW ROUTES 
           
           
           
           */


router.route('/api/replies/:id').get((req, res) => {
    //this route is exclusively to GET the parent and children threads
    //we need to add a new route to retreive only a single child
    Blog.findById(req.params.id)
        .then(thread => res.json(thread))
        .catch(err => console.log(err ))
});



router.route('/api/replies/add/:id').post((req, res) => {
    const comment = req.body.comment;
    const password = req.body.password;
     
    bcrypt.hash(password, 12, function (err, hash) {
    Blog.findById(req.params.id)
    .then(function (record) {
        record.replies.push({
            comment: comment,
            password: hash
        });
        record.save()
            .then(() => res.json("Succesfully added!"))
            .catch(error => res.json(error));
    })
    .catch(error => res.json("Error: " + error));
  });
});

router.route('/api/replies/delete/:id').delete((req, res) => {
    const password = req.body.password;
    const myId = req.params.id

        Blog.findById(myId)
         .then(function(record) {
             if(!record.replies.id(myId)){
                 res.redirect('/');
             } else {
                 bcrypt.compare(password, record.replies.password, function(err, result){
                     if(result === true){
                         res.redirect('/api/replies/:id')
                     } else{
                         res.send("Incorrect password");
                         res.redirect('/');
                     }
                 } )
             }
         })
         .catch(error => console.log(error));
    //do the bcrypt compare function and do validate if the reply exists in the data base
})


router.route('/api/replies/subthreads/:id').delete((req, res) => {
    //this route is exclusively to retrieve childen posts
    //TODO
    var myId = req.params.id;
    Blog.findOne({"replies._id": myId})
        .then(thread =>{
            var myObj = JSON.stringify(thread.replies) 
            console.log("Before comparison: " + myObj)
            if(myObj.id === myId){
                console.log("Founded dude!")
            } else{
                console.log("Not founded!  "+ thread.replies.id(myId))
                console.log(typeof(myId))
            }
        })
        .catch(error => console.log(error));
});

module.exports = router;