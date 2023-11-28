import { Model } from 'sequelize';

export default interface TicketModel extends Model {
    id: number;
    assignment: string;
    problemDescription: string;
    solutionAttempt: string;
    beingHelped: boolean;
}