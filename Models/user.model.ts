import { Model } from 'sequelize';

export default interface UserModel extends Model {
    id: number;
    name: string;
    email: string;
}