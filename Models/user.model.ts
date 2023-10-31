import { Model } from 'sequelize';
import Course from './course.model'

export default interface UserModel extends Model {
    name: string;
    email: string;
}