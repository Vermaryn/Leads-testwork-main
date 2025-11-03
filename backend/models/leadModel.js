const mongoose = require("mongoose");
const newSchema = mongoose.Schema({
    name:{ 
        type: String, 
        required: true 
    },
    email:{ 
        type: String, 
        required: true, 
        unique: true },
    phone:{ 
        type: String,
        unique: true,
    },
    feedback:{
        type:String
    },
    status: { 
    type: String, 
    enum: ["New", "Contacted"], 
    default: "New"
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Lead",newSchema);