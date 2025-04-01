const express = require('express');
const app = express();
const { initializeDB } = require("./data/database.js");
const port = process.env.PORT || 3000;





app
.use(express.json())
.use(express.urlencoded({extended: true}));



app.use('/', require('./routes/index.js'));

app.listen(port , ()=> { 
    initializeDB();
    console.log(`Database is listening and node runing on port:${port}`)});