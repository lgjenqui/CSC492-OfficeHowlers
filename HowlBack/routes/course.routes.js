module.exports = app => {
    const courses = require("../controllers/course.controller.js");

    var router = require("express").Router();

    // Create a course
    router.get("/", courses.createCourse);

    app.use('/api/course', router);
};
