import { Request, Response } from 'express';
import {retrieveUser} from '../services/user.service';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = retrieveUser(req.headers['x-shib_mail'] as string);
    res.status(200).json(user);
  }
  catch(error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });

  }
};
