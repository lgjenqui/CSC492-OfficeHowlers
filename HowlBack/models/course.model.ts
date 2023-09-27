import { Model, DataTypes, Sequelize, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize';
import sequelize from '../sequalize'; // Import path from module sequalize is imprted from

interface Course {
  courseName: string;
  description: string;
}

interface CourseAttributes extends Course {
  // Add any additional attributes you need when creating a course
}

class Course extends Model<InferAttributes<Course>, InferCreationAttributes<Course>> {
  declare courseName: string;
  declare description: string;

  // You can add class-level methods or associations here

  // If you have associations, define them here
}

Course.init(
  {
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

export default Course;
