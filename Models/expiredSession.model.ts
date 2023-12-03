import { Model } from 'sequelize';

export default interface ExpiredSessionModel extends Model {
    id: number;
    startTime: Date;
    endTime: Date;
    inPerson: Boolean;
    online: Boolean;
    inPersonLocation: String;
    onlineLocation: String;
    showToAll: Boolean;
}