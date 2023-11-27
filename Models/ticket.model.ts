import { Model } from 'sequelize';

export default interface TicketModel extends Model {
    id: number;
    problemDescription: string;
    solutionAttempt: string;
}