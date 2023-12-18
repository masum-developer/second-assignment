import { TUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (userData: TUser) => {
  if (await User.isUserExists(userData.userId)) {
    throw new Error('User already existst')
  }
  const result = await User.create(userData); // built in static method

  const finalResult = User.aggregate([{ $match: { userId: result.userId } }, { $project: { userId: 1, username: 1, fullName: 1, age: 1, email: 1, isActive: 1, hobbies: 1, address: 1, _id: 0 } }])
  return finalResult;
};
const getAllUsersFromDB = async () => {
  //const result = await User.find();
  const result = User.aggregate([
    { $project: { username: 1, fullName: 1, age: 1, email: 1, address: 1, _id: 0 } }
  ]);
  // const result = User.find({}).project({ fullName: 1, email: 1 });
  return result;
};
const getSingleUserFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.findOne({ userId: id });
    // const result = await User.aggregate([{ $match: { userId: id } }])
    return result;
  }
  else {
    throw new Error('User not found')
  }

};
const deleteSingleUserFromDB = async (id: number) => {
  const result = await User.updateOne({ userId: id }, { isDeleted: true })
  return result;
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  deleteSingleUserFromDB,
};
