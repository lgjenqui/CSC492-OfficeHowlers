import { Model, DataTypes, InferAttributes, InferCreationAttributes, Association, NonAttribute, 
  HasManyGetAssociationsMixin, HasManyAddAssociationsMixin, HasManyAddAssociationMixin, HasManySetAssociationsMixin, HasManyRemoveAssociationsMixin } from 'sequelize';
import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
import CourseModel from "../../Models/course.model";
import User from "./user.model";
import Ticket from "./ticket.model";
import Session from "./session.model";
import { UUID } from 'crypto';
import { COURSE_JOIN_CODE_LENGTH } from '../src/constants';

class Course extends Model<InferAttributes<CourseModel>, InferCreationAttributes<CourseModel>> {
  declare id: UUID;
  declare name: string;
  declare description: string;
  declare startDate: Date;
  declare endDate: Date;
  declare studentJoinCode: string;
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
  declare removeStudent: HasManyRemoveAssociationsMixin<User, number>;
  declare removeInstructor: HasManyRemoveAssociationsMixin<User, number>;
  declare removeAssistant: HasManyRemoveAssociationsMixin<User, number>;
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
    studentJoinCode: {
      type: DataTypes.STRING(COURSE_JOIN_CODE_LENGTH),
      allowNull: true,
      unique: true
    }
  },
  {
    sequelize, // Providing the Sequelize instance here
    modelName: 'Course',
  }
);

// Generates a random code consisting of uppercase letters and numbers of a specified length
function generateRandomCode(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let result = '';

  for (let i = 0; i < length; i++) {
    // Multiply a random float between 0 and 1 by the number of possible characters to 
    // get a random index
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

// Generates random codes until it finds a unique one
export async function generateUniqueJoinCode(): Promise<string> {
  const code = generateRandomCode(COURSE_JOIN_CODE_LENGTH);

  // Look for a course where the student join code is equal to this newly generated code
  const existingCourse = await Course.findOne({ where: { studentJoinCode: code } });
  if (existingCourse) {
    // If code exists, recursively generate a new one
    return generateUniqueJoinCode();
  }
  return code;
}

// Generate a unique join code for the course before its creation
Course.beforeCreate(async (course, options) => {
  course.studentJoinCode = await generateUniqueJoinCode();
});

export default Course;
