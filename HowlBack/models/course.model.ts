import { Model, DataTypes, InferAttributes, InferCreationAttributes } from 'sequelize';
import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
import CourseModel from "../../Models/course.model";
import { UUID } from 'crypto';

class Course extends Model<InferAttributes<CourseModel>, InferCreationAttributes<CourseModel>> {
  declare id: UUID;
  declare name: string;
  declare description: string;

  // You can add class-level methods or associations here

  // If you have associations, define them here
}

Course.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
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
