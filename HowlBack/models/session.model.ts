import { Model, DataTypes, InferAttributes, InferCreationAttributes, Association, 
  HasOneSetAssociationMixin, ForeignKey} from 'sequelize';
  import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
  import SessionModel from "../../Models/session.model";
  import Course from "./course.model";
  import User from "./user.model"
//   import Ticket from "./ticket.model"
  
  class Session extends Model<InferAttributes<SessionModel>, InferCreationAttributes<SessionModel>> {
    declare id: number;
    declare startTime: Date;
    declare endTime: Date;
    declare setUser: HasOneSetAssociationMixin<User, string>; 

    // declare tickets?: NonAttribute<Ticket[]>;
  
    // declare getTickets: HasManyGetAssociationsMixin<Ticket>; // Note the null assertions!
    // declare addTicket: HasManyAddAssociationMixin<Ticket, number>;
  
    declare static associations: {
      user: Association<Session, User>;
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
  
  export default Session;
  