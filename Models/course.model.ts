import { Model } from 'sequelize';
import { UUID } from 'crypto';

export default interface CourseModel extends Model {
    id: UUID;
    name: string;
    description: string;
}