const mongoose = require("mongoose");

require("dotenv").config();


async function initializeDB(){

    const uri = process.env.URI;
    
    mongoose.connect(uri, {

    })
    .then(() =>{
        console.log("Connected to MongoDB");
    })
    .catch((err) =>{
        console.error("Error connecting to mongoDB", err);
    })

    
}


module.exports = {
    initializeDB
}