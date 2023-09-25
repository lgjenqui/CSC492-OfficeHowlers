const db = require("../db.js");
const Course = db.courses;


exports.createCourse = (req, res) => {
    const course = {
        courseName: "CSC316",
        description: "algos bb"
    };
  
    // Save course in the database
    Course.create(course)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
            message:
                err.message || "Some error occurred while creating the Course."
            });
        });
};
