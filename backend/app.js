require('dotenv').config({quiet:true});
const express = require("express");
const app = express();
const cors = require('cors');
const mongoose = require("mongoose");
const leadRoute = require("./routes/leadRoute");

app.use(cors());
app.use(express.json());

async function main() {
    await mongoose.connect(process.env.MONGODB);   
};

main().then(()=>{
    console.log("Database is connected");
}).catch((err)=>console.log(err));
app.get("/",(req,res)=>{
    res.send("root");
})
app.use('/api/v1/lead',leadRoute);

app.listen(process.env.PORT,()=>{
    console.log("App is listening");
})