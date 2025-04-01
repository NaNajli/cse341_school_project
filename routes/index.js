const router = require('express').Router();

router.get('/', (req , res)=>{
    //#swagger-tags['School Project']
    res.send('School Project');});

router.use('/', require('./swagger'));

router.use("/teachers", require("./teachers.js"));

router.use("/students", require("./students.js"));

// router.use("/students", require("./students"));

module.exports = router;