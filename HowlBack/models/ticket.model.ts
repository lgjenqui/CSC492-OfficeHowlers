import { Model, DataTypes, InferAttributes, InferCreationAttributes, Association, 
    HasOneSetAssociationMixin, ForeignKey, HasManyGetAssociationsMixin, 
    HasManyAddAssociationMixin, NonAttribute } from 'sequelize';
    import sequelize from '../sequelize_db'; // Import path from module sequalize is imprted from
    import TicketModel from "../../Models/ticket.model";
    import Course from "./course.model";
    import User from "./user.model"
    
    class Ticket extends Model<InferAttributes<TicketModel>, InferCreationAttributes<TicketModel>> {
      declare id: number;
      declare name: string;
      declare description: string;
      declare setUser: HasOneSetAssociationMixin<User, string>;
      declare setCourse: HasOneSetAssociationMixin<Course, string>;
    
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
        name: {
          type: DataTypes.STRING
        },
        description: {
          type: DataTypes.STRING
        },
      },
      {
        sequelize, // Providing the Sequelize instance here
        modelName: 'Ticket',
      }
    );
  
    Ticket.hasOne(Course);
    Course.hasMany(Ticket);

    
    Ticket.hasOne(User);
    User.hasOne(Ticket);
    
    export default Ticket;
