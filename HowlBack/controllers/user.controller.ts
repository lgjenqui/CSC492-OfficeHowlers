import { Request, Response } from 'express';
import User from "../../Models/user.model";
import {retrieveUser} from '../services/user.service';

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("awaiting user!");
    const user = await retrieveUser(req.headers['x-shib_mail'] as string) as User;
    res.status(200).json(user);
  }
  catch(error) {
    res.status(500).json({ message: 'Error retrieving user', error: error.message });
  }
};
