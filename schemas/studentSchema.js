const mongoose = require("mongoose");
const studentSchema = new mongoose.Schema({
    name:{
        type:String, 
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true, 
        unique:true,
        lowercase:true,
    },
    age:{
        type:Number,
        min:1,
        max:70,
    },
    course:{
        type:String,
        default:"BCA",
    },
    skills:[String],
    
    
}, {timestamps: true});

const Student = mongoose.model("Student", studentSchema);
module.exports = Student;