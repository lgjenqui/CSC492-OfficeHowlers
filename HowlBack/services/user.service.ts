import User from '../models/user.model';

export async function retrieveUser(email: string) {
    return User.findByPk(email);
}

export async function findOrCreateUser(email: string, firstName: string,lastName:string, role: string) {
    let user = await retrieveUser(email);
    if (!user) {
      user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        primaryRole: role
      });
    }
    return user;
}