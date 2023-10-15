import { Model, DataTypes, InferAttributes, InferCreationAttributes, Association, NonAttribute, 
  HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManySetAssociationsMixin } from 'sequelize';
import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
import CourseModel from "../../Models/course.model";
import User from "./user.model";

class Course extends Model<InferAttributes<CourseModel>, InferCreationAttributes<CourseModel>> {
  declare id: number;
  declare name: string;
  declare description: string;
  declare startDate: Date;
  declare endDate: Date;
  declare instructors?: NonAttribute<User[]>;
  declare assistants?: NonAttribute<User[]>;
  declare students?: NonAttribute<User[]>;

  declare getInstructors: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  declare addInstructor: HasManyAddAssociationMixin<User, number>;
  declare getAssistants: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  declare addAssistant: HasManyAddAssociationMixin<User, number>;
  declare getStudents: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  declare addStudent: HasManyAddAssociationMixin<User, number>;
  declare setInstructors: HasManySetAssociationsMixin<User, number>;
  declare setAssistants: HasManySetAssociationsMixin<User, number>;
  declare setStudents: HasManySetAssociationsMixin<User, number>;

  declare static associations: {
    instructors: Association<Course, User>;
    assistants: Association<Course, User>;
    students: Association<Course, User>;
  };
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
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
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
