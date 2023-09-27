import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../sequalize'; // Import path from module sequalize is imprted from
import CourseModel from "../../Models/course.model";

class Course extends Model<InferAttributes<CourseModel>, InferCreationAttributes<CourseModel>> {
  declare id: number;
  declare name: string;
  declare description: string;

  // You can add class-level methods or associations here

  // If you have associations, define them here
}

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
