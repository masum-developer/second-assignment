import { IUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (user: IUser) => {
    const result = await User.create(user);
    return result;
}
const getAllUsersFromDB = async () => {
    const result = await User.find();
    return result;
}

export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
}