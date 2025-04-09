const passport = require('passport');
const router = require('express').Router();

//  router.get('/', (req , res)=>{
    //  #swagger-tags['School Project']
    //  res.send('School Project');});

router.use('/', require('./swagger'));

router.use("/teachers", require("./teachers.js"));

router.use("/students", require("./students.js"));

router.use("/classes", require("./classes.js"));

router.use("/books", require("./books.js"));


router.get('/login', passport.authenticate('github'),(req,res)=>{});

router.get('/logout' , function(req , res,next)
{
    req.logout(function(err){
        if(err){return next(err);}
        res.redirect('/')
    });
});



module.exports = router;