const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const { initializeDB } = require("./data/database.js");
const port = process.env.PORT || 3000;





app
.use(express.json())
.use(express.urlencoded({extended: true}))
.use(bodyParser.json())
.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})
.use(cors())
.use('/', require('./routes/index.js'));

app.listen(port , ()=> { 
    initializeDB();
    console.log(`Database is listening and node runing on port:${port}`)});