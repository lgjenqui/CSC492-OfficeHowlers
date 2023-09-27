import { Sequelize } from "sequelize";

export interface Course {

}

export interface CourseAttributes {
  
}

const sequelize = new Sequelize(process.env.MARIADB_DATABASE, process.env.MARIADB_ROOT_USERNAME, process.env.MARIADB_ROOT_PASSWORD, {
  host: process.env.MARIADB_HOST,
  port: Number(process.env.MARIADB_PORT),
  dialect: 'mariadb',
  define: {
    timestamps: false
  }
});

export const db: any = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.courses = require("../models/course.model.js")(sequelize, Sequelize);
// db.instructors = require("./models/instructor.model.js")(sequelize, Sequelize);
// db.students = require("./models/student.model.js")(sequelize, Sequelize);
// db.teachingAssistants = require("./models/teachingassistant.model.js")(sequelize, Sequelize);

