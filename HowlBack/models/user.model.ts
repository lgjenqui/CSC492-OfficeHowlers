import { Model, DataTypes, InferAttributes, InferCreationAttributes, NonAttribute, Association,
  HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin,
  HasManySetAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, 
  HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyCountAssociationsMixin, 
  HasManyCreateAssociationMixin } from 'sequelize';
import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
import UserModel from "../../Models/user.model";
import Course from "./course.model";

class User extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  declare name: string;
  declare email: string;
  declare courses?: NonAttribute<Course[]>;

  declare getCourses: HasManyGetAssociationsMixin<Course>; // Note the null assertions!
  declare addCourse: HasManyAddAssociationMixin<Course, number>;
  declare addCourses: HasManyAddAssociationsMixin<Course, number>;
  declare setCourses: HasManySetAssociationsMixin<Course, number>;
  declare removeCourse: HasManyRemoveAssociationMixin<Course, number>;
  declare removeCourses: HasManyRemoveAssociationsMixin<Course, number>;
  declare hasCourse: HasManyHasAssociationMixin<Course, number>;
  declare hasCourses: HasManyHasAssociationsMixin<Course, number>;
  declare countCourses: HasManyCountAssociationsMixin;
  // declare createCourse: HasManyCreateAssociationMixin<Course, "userId">;

  declare static associations: {
    courses: Association<User, Course>;
  };
}

User.init(
  {
    name: {
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

User.hasMany(Course, {
  sourceKey: 'email',
  foreignKey: 'userId',
  as: 'courses' // this determines the name in `associations`!
});

sequelize.sync();
export default User;
