import { Model } from 'sequelize';

export default interface SessionModel extends Model {
    id: number;
    startTime: Date;
    endTime: Date;
    inPerson: Boolean;
    online: Boolean;
}