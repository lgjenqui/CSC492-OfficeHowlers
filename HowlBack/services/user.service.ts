import User from '../models/user.model';

export async function retrieveUser(email: string) {
    return User.findByPk(email);
}

export async function findOrCreateUser(email: string, firstName: string, role: string) {
    let user = await retrieveUser(email);
    if (!user) {
      user = await User.create({
        firstName: firstName,
        email: email,
        primaryRole: role
      });
    }
    return user;
}