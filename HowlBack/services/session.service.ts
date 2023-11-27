import { Where } from 'sequelize/types/utils';
import Session from '../models/course.model';
import { Op, WhereOptions } from 'sequelize';

export const deleteExpiredSession = async () => {
    try {
        const expiredSessions = await Session.findAll ({
            where: {
                endTime: { [Op.lt]: new Date() },
            } as WhereOptions,
        });

        await Promise.all(expiredSessions.map(session => session.destroy()));
        console.log('Expired sessions deleted successfully.');
    }
    catch(error) {
        console.error('Error deleting session: ', error);
    }

};