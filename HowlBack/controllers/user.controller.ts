import { Request, Response } from 'express';
import User from '../models/user.model';
import {retrieveUser, findOrCreateUser} from '../services/user.service';

export const getUsername = async (req: Request, res: Response): Promise<void> => {
  try {
    const firstname = req.headers['x-shib_givenname'];
    res.status(200).json(firstname);
  }
  catch(error) {
    res.status(500).json({ message: 'Error retrieving username', error: error.message });

  }
};
