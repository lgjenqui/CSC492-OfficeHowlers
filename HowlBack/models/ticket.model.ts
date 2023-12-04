import { Model, DataTypes, InferAttributes, InferCreationAttributes, Association, 
    HasOneSetAssociationMixin, HasOneGetAssociationMixin, ForeignKey, HasManyGetAssociationsMixin, 
    HasManyAddAssociationMixin, NonAttribute, HasManyRemoveAssociationsMixin } from 'sequelize';
    import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
    import TicketModel from "../../Models/ticket.model";
    import Course from "./course.model";
    import User from "./user.model"
    
    class Ticket extends Model<InferAttributes<TicketModel>, InferCreationAttributes<TicketModel>> {
      declare id: number;
      declare assignment: string;
      declare problemDescription: string;
      declare solutionAttempt: string;
      declare active: boolean;
      declare location: string;
      
      declare setUser: HasOneSetAssociationMixin<User, string>;
      declare setCourse: HasOneSetAssociationMixin<Course, string>;
      declare getCourse: HasOneGetAssociationMixin<Course>;
      declare getUser: HasOneGetAssociationMixin<User>;
    
      declare static associations: {
        user: Association<Ticket, User>;
      };
    }
    
    Ticket.init(
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        assignment: {
          type: DataTypes.STRING
        },
        problemDescription: {
          type: DataTypes.STRING
        },
        solutionAttempt: {
          type: DataTypes.STRING
        },
        active: {
          type: DataTypes.BOOLEAN,
          defaultValue: false
        },
        location: {
          type: DataTypes.STRING,
          defaultValue: ""
        }
      },
      {
        sequelize, // Providing the Sequelize instance here
        modelName: 'Ticket',
      }
    );
  
    Ticket.belongsTo(Course);
    Course.hasMany(Ticket);

    Ticket.belongsTo(User);
    User.hasOne(Ticket);
    
    export default Ticket;
