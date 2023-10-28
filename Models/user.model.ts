import { Model } from 'sequelize';

export default interface UserModel extends Model {
    name: string;
    email: string;
}