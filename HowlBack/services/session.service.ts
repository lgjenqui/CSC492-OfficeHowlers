import { Where } from 'sequelize/types/utils';
import Session from '../models/session.model';
import ExpiredSession from '../models/expiredSession.model';
import { Op, WhereOptions } from 'sequelize';

export const deleteExpiredSession = async () => {
    try {
        const expiredSessionsList = await Session.findAll ({
            where: {
                endTime: { [Op.lt]: new Date() },
            } as WhereOptions,
        });

        await Promise.all(expiredSessionsList.map(session => session.destroy()));
        console.log('Expired sessions deleted successfully.');
    }
    catch(error) {
        console.error('Error deleting session: ', error);
    }

};