import { Model } from 'sequelize';

export default interface UserModel extends Model {
    firstName: string;
    email: string;
    primaryRole: string;
}