//import mongoose
const res = require('express/lib/response')
const mongoose = require('mongoose')

//connection string of mongodb
const connectionString = process.env.DATABASE

//connect to mongodb using mongoose
mongoose.connect(connectionString).then(()=>{
    console.log(`mongodb conected successfully`);
}).catch((err)=>{
    console.log(`mongodb connection failed due to : ${err}`);
})