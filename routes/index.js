const router = require('express').Router();

router.get('/', (req , res)=>{res.send('School Project');});

router.use("/teachers", require("./teachers"));

router.use("/students", require("./students"))

module.exports = router;