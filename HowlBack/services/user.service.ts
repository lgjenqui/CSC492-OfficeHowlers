import User from '../models/user.model';

export async function retrieveUser(email: string) {
    return User.findByPk(email);
}

export async function findOrCreateUser(email: string) {
    let user = await retrieveUser(email);
    if (!user) {
      user = await User.create({
        name: "Unset name",
        email: email,
      });
    }
    return user;
}