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

app.listen(3000, () => {
    console.log("Server running on port 3000");
});