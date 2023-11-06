import TicketModel from './ticket.model';

export default interface TicketWrapperModel extends TicketModel {
    Course: {
        name: string,
        description: string
    };
    User: {
        firstName: string,
        lastName: string
    }
}