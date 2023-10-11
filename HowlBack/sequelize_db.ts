// sequelize_db.ts

import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.MARIADB_DATABASE || '', process.env.MARIADB_ROOT_USERNAME || '',
 process.env.MARIADB_ROOT_PASSWORD || '', {
  host: process.env.MARIADB_HOST,
  dialect: 'mariadb', // or another dialect like 'mysql'
});

export default sequelize;


// import User from "./models/user.model";
// import Course from "./models/course.model";

// User.hasMany(Course, {
//   sourceKey: 'email',
//   foreignKey: 'instructorId',
//   as: 'instructorCourses' // this determines the name in `associations`!
// });

// User.hasMany(Course, {
//   sourceKey: 'email',
//   foreignKey: 'assistantId',
//   as: 'assistantCourses' // this determines the name in `associations`!
// });

// User.hasMany(Course, {
//   sourceKey: 'email',
//   foreignKey: 'studentId',
//   as: 'studentCourses' // this determines the name in `associations`!
// });

// Course.hasMany(User, {
//   sourceKey: 'id',
//   foreignKey: 'instructorCourseId',
//   as: 'instructors' // this determines the name in `associations`!
// });

// Course.hasMany(User, {
//   sourceKey: 'id',
//   foreignKey: 'assistantCourseId',
//   as: 'assistants' // this determines the name in `associations`!
// });

// Course.hasMany(User, {
//   sourceKey: 'id',
//   foreignKey: 'studentCourseId',
//   as: 'students' // this determines the name in `associations`!
// });

sequelize.sync();
