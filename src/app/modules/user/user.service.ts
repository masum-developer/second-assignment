import { TOrders, TUser } from './user.interface';
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

  return result;
};
const getSingleUserFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    //  const result = await User.findOne({ userId: id });
    const result = await User.aggregate([
      { $match: { userId: id } },
      { $project: { userId: 1, username: 1, fullName: 1, age: 1, email: 1, isActive: 1, hobbies: 1, address: 1, _id: 0 } }
    ])
    return result;
  }
  else {
    throw new Error('User not found')
  }

};
const updateSingleUserFromDB = async (userId: number, userData: TUser) => {

  if (await User.isUserExists(userId)) {
    if (await User.isUserNameExists(userData.username)) {

      throw new Error('Username Already Exists')
    } else {

      const updateBody = {
        username: userData.username,
        fullName: {
          firstName: userData.fullName.firstName,
          lastName: userData.fullName.lastName
        },
        age: userData.age,
        email: userData.email,
        isActive: userData.isActive,
        hobbies: userData.hobbies,
        address: {
          street: userData.address.street,
          city: userData.address.city,
          country: userData.address.country
        }
      }
      const result = await User.updateOne(
        { userId: userId },
        updateBody
      );
      return result;
    }
  }
  else {
    throw new Error('User not found')
  }


}
const deleteSingleUserFromDB = async (id: number) => {
  const result = await User.updateOne({ userId: id }, { isDeleted: true })
  return result;
}
const appendNewProductInOrderToDB = async (userId: number, productBody: TOrders) => {
  const userData = await User.findOne({ userId: userId });
  if (userData) {
    const orders = userData.orders
    orders?.push({
      productName: productBody.productName,
      price: productBody.price,
      quantity: productBody.quantity
    })
    const updateBody = {
      orders
    }
    const result = await User.updateOne(
      { userId: userId },
      updateBody
    );

    return result;
  }


}
const allOrderForSpecificUserFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.aggregate([
      { $match: { userId: id } },
      { $project: { orders: 1, _id: 0 } }
    ])
    return result;
  }
  else {
    throw new Error('User not found')
  }
}
const allOrderTotalPriceForSpecificUserFromDB = async (id: number) => {
  if (await User.isUserExists(id)) {
    const result = await User.aggregate([
      { $match: { userId: id } },
      { $project: { orders: 1, _id: 0 } }
    ])

    let totalCost = 0;

    result.forEach(item => {
      item.orders.forEach((order: { price: number; quantity: number; }) => {
        totalCost += order.price * order.quantity;
      });
    });
    return totalCost;
  }
  else {
    throw new Error('User not found')
  }
}

export const UserServices = {
  createUserIntoDB,
  getAllUsersFromDB,
  getSingleUserFromDB,
  updateSingleUserFromDB,
  deleteSingleUserFromDB,
  appendNewProductInOrderToDB,
  allOrderForSpecificUserFromDB,
  allOrderTotalPriceForSpecificUserFromDB
};
