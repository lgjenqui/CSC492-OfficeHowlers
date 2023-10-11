import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
import CourseModel from "../../Models/course.model";
import User from "./user.model";

class Course extends Model<InferAttributes<CourseModel>, InferCreationAttributes<CourseModel>> {
  declare id: number;
  declare name: string;
  declare description: string;

  // static associate(models: any) {
  //   this.hasMany(models.User, { foreignKey: 'userid' });
  //   this.belongsToMany(models.User, { through: 'StudentCourses', foreignKey: 'courseid', as: 'StudentCourses' });
  // }
}

// Course.belongsToMany(User, { through: 'CourseStudent' });

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize, // Providing the Sequelize instance here
    modelName: 'Course',
  }
);

sequelize.sync();
export default Course;
