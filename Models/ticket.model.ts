import { Model } from 'sequelize';

export default interface TicketModel extends Model {
    id: number;
    name: string;
    description: string;
}