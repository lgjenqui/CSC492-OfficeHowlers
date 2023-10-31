import { Model, DataTypes, InferAttributes, InferCreationAttributes, Association, NonAttribute, 
  HasManyGetAssociationsMixin, HasManyAddAssociationsMixin, HasManyAddAssociationMixin, HasManySetAssociationsMixin } from 'sequelize';
import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
import CourseModel from "../../Models/course.model";
import User from "./user.model";
import Ticket from "./ticket.model";
import Session from "./session.model";
import { UUID } from 'crypto';

class Course extends Model<InferAttributes<CourseModel>, InferCreationAttributes<CourseModel>> {
  declare id: UUID;
  declare name: string;
  declare description: string;
  declare startDate: Date;
  declare endDate: Date;
  declare instructors?: NonAttribute<User[]>;
  declare assistants?: NonAttribute<User[]>;
  declare students?: NonAttribute<User[]>;
  // declare session?: NonAttribute<Session>;

  declare getInstructors: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  declare addInstructors: HasManyAddAssociationsMixin<User, number>;
  declare addInstructor: HasManyAddAssociationMixin<User, number>;
  declare getAssistants: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  declare addAssistants: HasManyAddAssociationsMixin<User, number>;
  declare getStudents: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  declare addStudents: HasManyAddAssociationsMixin<User, number>;
  declare addStudent: HasManyAddAssociationMixin<User, number>;
  declare setInstructors: HasManySetAssociationsMixin<User, number>;
  declare setAssistants: HasManySetAssociationsMixin<User, number>;
  declare setStudents: HasManySetAssociationsMixin<User, number>;

  declare getSessions: HasManyGetAssociationsMixin<Session>;

  declare getTickets: HasManyGetAssociationsMixin<Session>;
  declare addTicket: HasManyAddAssociationMixin<Ticket, number>;

  declare static associations: {
    instructors: Association<Course, User>;
    assistants: Association<Course, User>;
    students: Association<Course, User>;
  };
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

// Course.hasOne(Session);

export default Course;
