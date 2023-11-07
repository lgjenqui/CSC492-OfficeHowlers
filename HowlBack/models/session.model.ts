import { Model, DataTypes, InferAttributes, InferCreationAttributes, Association, 
  HasOneSetAssociationMixin, ForeignKey, HasManyGetAssociationsMixin, 
  HasManyAddAssociationMixin, NonAttribute } from 'sequelize';
  import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
  import SessionModel from "../../Models/session.model";
  import Course from "./course.model";
  import User from "./user.model"
import { UUID } from 'crypto';
//   import Ticket from "./ticket.model"
  
  class Session extends Model<InferAttributes<SessionModel>, InferCreationAttributes<SessionModel>> {
    declare id: number;
    declare startTime: Date;
    declare endTime: Date;
    declare inPerson: Boolean;
    declare online: Boolean;
    declare setUser: HasOneSetAssociationMixin<User, string>; 

    declare courses?: NonAttribute<Course[]>;
  
    declare getCourses: HasManyGetAssociationsMixin<Course>; // Note the null assertions!
    declare addCourse: HasManyAddAssociationMixin<Course, string>;
  
    declare static associations: {
      user: Association<Session, User>;
      courses: Association<Session, Course>;
    };
  }
  
  Session.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      startTime: {
        type: DataTypes.DATE
      },
      endTime: {
        type: DataTypes.DATE
      },
      inPerson: {
        type: DataTypes.BOOLEAN
      },
      online: {
        type: DataTypes.BOOLEAN
      },
    },
    {
      sequelize, // Providing the Sequelize instance here
      modelName: 'Session',
    }
  );

  // Session.belongsTo(Course, { targetKey: 'id' });
  // Course.hasOne(Session, { sourceKey: 'id' });

  Session.belongsTo(User);
  User.hasOne(Session);

  Course.belongsToMany(Session, 
    {through: "SessionCourse", as: "sessions"}
  );
  
  Session.belongsToMany(Course, 
    {through: "SessionCourse", as: "courses"}
  );
  
  export default Session;
  