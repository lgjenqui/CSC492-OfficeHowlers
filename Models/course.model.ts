import { Model } from 'sequelize';

export default interface CourseModel extends Model {
    id: number;
    name: string;
    description: string;
    startDate: Date;
    endDate: Date;
}