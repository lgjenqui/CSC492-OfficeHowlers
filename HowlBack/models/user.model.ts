import { Model, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute, Association,
  HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, 
  HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, 
  HasManyCreateAssociationMixin } from 'sequelize';
import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
import UserModel from "../../Models/user.model";
import Course from "./course.model";

class User extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare firstName: string;
  declare email: string;
  declare instructorCourses?: NonAttribute<Course[]>;
  declare assistantCourses?: NonAttribute<Course[]>;
  declare studentCourses?: NonAttribute<Course[]>;

  declare getInstructorCourses: HasManyGetAssociationsMixin<Course>; // Note the null assertions!
  declare addInstructorCourse: HasManyAddAssociationMixin<Course, number>;
  declare getAssistantCourses: HasManyGetAssociationsMixin<Course>; // Note the null assertions!
  declare addAssistantCourse: HasManyAddAssociationMixin<Course, number>;
  declare getStudentCourses: HasManyGetAssociationsMixin<Course>; // Note the null assertions!
  declare addStudentCourse: HasManyAddAssociationMixin<Course, number>;
  // declare addCourses: HasManyAddAssociationsMixin<Course, number>;
  // declare setCourses: HasManySetAssociationsMixin<Course, number>;
  // declare removeCourse: HasManyRemoveAssociationMixin<Course, number>;
  // declare removeCourses: HasManyRemoveAssociationsMixin<Course, number>;
  // declare hasCourse: HasManyHasAssociationMixin<Course, number>;
  // declare hasCourses: HasManyHasAssociationsMixin<Course, number>;
  // declare countCourses: HasManyCountAssociationsMixin;
  // declare createCourse: HasManyCreateAssociationMixin<Course, "userId">;

  declare static associations: {
    instructorCourses: Association<User, Course>;
    assistantCourses: Association<User, Course>;
    studentCourses: Association<User, Course>;
  };
}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      unique: true
    },
  },
  {
    sequelize, // Providing the Sequelize instance here
    modelName: 'User',
  }
);

User.belongsToMany(Course, 
  {through: "InstructorCourse", as: "instructorCourses"}
);

Course.belongsToMany(User, 
  {through: "InstructorCourse", as: "instructors"}
);

User.belongsToMany(Course, 
  {through: "AssistantCourse", as: "assistantCourses"}
);

Course.belongsToMany(User, 
  {through: "AssistantCourse", as: "assistants"}
);

User.belongsToMany(Course, 
  {through: "StudentCourse", as: "studentCourses"}
);

Course.belongsToMany(User, 
  {through: "StudentCourse", as: "students"}
);



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

export default User;
