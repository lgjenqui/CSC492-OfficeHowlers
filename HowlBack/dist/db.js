"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(process.env.MARIADB_DATABASE, process.env.MARIADB_ROOT_USERNAME, process.env.MARIADB_ROOT_PASSWORD, {
    host: process.env.MARIADB_HOST,
    port: Number(process.env.MARIADB_PORT),
    dialect: 'mariadb',
    define: {
        timestamps: false
    }
});
exports.db = {};
exports.db.Sequelize = sequelize_1.Sequelize;
exports.db.sequelize = sequelize;
// db.courses = require("../models/course.model.js")(sequelize, Sequelize);
// db.instructors = require("./models/instructor.model.js")(sequelize, Sequelize);
// db.students = require("./models/student.model.js")(sequelize, Sequelize);
// db.teachingAssistants = require("./models/teachingassistant.model.js")(sequelize, Sequelize);
//# sourceMappingURL=db.js.map