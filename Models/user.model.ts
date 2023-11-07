import { Model } from 'sequelize';

export default interface UserModel extends Model {
    firstName: string;
    lastName: string;
    email: string;
    primaryRole: string;
}