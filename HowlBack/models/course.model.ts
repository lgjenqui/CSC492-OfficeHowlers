import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../sequalize'; // Import path from module sequalize is imprted from

interface Course {
  courseName: string;
  description: string;
}

class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
  declare id: number;
  declare courseName: string;
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
    courseName: {
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
