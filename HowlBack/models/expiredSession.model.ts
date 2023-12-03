import { Model, DataTypes, InferAttributes, InferCreationAttributes, Association, 
  HasOneSetAssociationMixin, ForeignKey, HasManyGetAssociationsMixin, 
  HasManyAddAssociationMixin, NonAttribute } from 'sequelize';
  import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
  import ExpiredSessionModel from "../../Models/expiredSession.model";
  import Course from "./course.model";
  import User from "./user.model"
import { UUID } from 'crypto';
//   import Ticket from "./ticket.model"
  
  class ExpiredSession extends Model<InferAttributes<ExpiredSessionModel>, InferCreationAttributes<ExpiredSessionModel>> {
    declare id: number;
    declare startTime: Date;
    declare endTime: Date;
    declare inPerson: Boolean;
    declare online: Boolean;
    declare inPersonLocation: String;
    declare onlineLocation: String;
    declare showToAll: Boolean;
    declare showToHelpees: Boolean;
    declare setUser: HasOneSetAssociationMixin<User, string>; 

    declare courses?: NonAttribute<Course[]>;
  
    declare getCourses: HasManyGetAssociationsMixin<Course>; // Note the null assertions!
    declare addCourse: HasManyAddAssociationMixin<Course, string>;
  
    declare static associations: {
      user: Association<ExpiredSession, User>;
      courses: Association<ExpiredSession, Course>;
    };
  }
  
  ExpiredSession.init(
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
      inPersonLocation: {
        type: DataTypes.STRING
      },
      onlineLocation: {
        type: DataTypes.STRING
      },
      showToAll: {
        type: DataTypes.BOOLEAN
      },
    },
    {
      sequelize, // Providing the Sequelize instance here
      modelName: 'ExpiredSession',
    }
  );

  // Session.belongsTo(Course, { targetKey: 'id' });
  // Course.hasOne(Session, { sourceKey: 'id' });

  ExpiredSession.belongsTo(User);
  User.hasOne(ExpiredSession);

  Course.belongsToMany(ExpiredSession, 
    {through: "ExpiredSessionCourse", as: "expiredSessions"}
  );
  
  ExpiredSession.belongsToMany(Course, 
    {through: "ExpiredSessionCourse", as: "courses"}
  );
  
  export default ExpiredSession;
  