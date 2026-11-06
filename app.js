require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");
const Student = require("./schemas/studentSchema");
const app = express();

connectDB();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Server is running");
});

// POST - Create Student
app.post("/students", async (req, res) => {
    try {
        const student = await Student.create(req.body);

        res.status(201).json({
            message: "Student created successfully",
            student: student
        });

    } catch (error) {
        res.status(400).json({
            message: "Error creating student",
            error: error.message
        });
    }
});

//READ 
app.get("/students", async (req, res) => {
  try{
    const students= await Student.find();
    res.json(students);
  } catch(err){
    res.status(500).json({message: err.message});
  }
});

//READ BY ID
app.get("/students/:id", async(req, res) =>{
    try{
        const studentById = await Student.findById(req.params.id);
        if(!studentById){
            return res.status(404).json({message: "Student not found"});
        }
        res.json(studentById);
    } catch(err){
        res.status(500).json({message: err.message});
    }
});

//UPDATE
app.put("/students/:id", async(req, res) =>{
    try{
        const updatedStudent = await Student.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if(!updatedStudent){
            return res.status(404).json({message: "Student not found"});
        }
        
        res.json({
            message: "Student updated successfully",
            updatedstudent: updatedStudent
        });
    } catch(err){   
        res.status(500).json({message: err.message});
    }
});

//DELETE
app.delete("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.json({
            message: "Student deleted successfully",
            student
        });

    } catch (error) {
        res.status(400).json({
            message: "Error deleting student",
            error: error.message
        });
    }
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});