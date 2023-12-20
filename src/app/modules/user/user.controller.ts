import { Request, Response } from 'express';
import { UserServices } from './user.service';
import userValidationSchema from './user.validation';


const createUser = async (req: Request, res: Response) => {
  try {

    const { user: userData } = req.body;
    const zodParseData = userValidationSchema.parse(userData)
    const result = await UserServices.createUserIntoDB(zodParseData);

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    });
  } catch (err: any) {

    res.status(500).json({
      success: false,
      message: err.message || 'Please Insert data Carefully',
      error: {
        'code': 500,
        'description': err.message || 'Please Insert data Carefully',
      },
    });
  }
};
const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.getAllUsersFromDB();
    res.status(200).json({
      success: true,
      message: 'Users fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: 'Something Wrong',
      error: {
        'code': 500,
        'description': err.message || 'Something Wrong'
      },
    });
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const result = await UserServices.getSingleUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'User fetched successfully',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        'code': 404,
        'description': 'User not found!',
      },
    });
  }
};
const updateSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const userBody = req.body;
    const responseData = userBody;
    responseData.userId = userId;


    const result = await UserServices.updateSingleUserFromDB(userId, userBody);
    res.status(200).json({
      success: true,
      message: 'User updated successfully!',
      data: result.modifiedCount > 0 ? responseData : result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        'code': 404,
        'description': err.message || 'User not found!',
      },
    });
  }
}
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await UserServices.deleteSingleUserFromDB(userId)
    res.status(200).json({
      success: true,
      message: 'User deleted successfully!',
      data: result.upsertedId,
    });
  }
  catch (err: any) {
    res.status(404).json({
      success: false,
      message: 'User not found',
      error: {
        'code': 404,
        'description': 'User not found!',
      },
    });
  }
}
const appendNewProductInOrder = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const productBody = req.body;
    const result = await UserServices.appendNewProductInOrderToDB(userId, productBody);

    res.status(200).json({
      success: true,
      message: 'Order created successfully!',
      data: result && result.modifiedCount > 0 ? null : result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'Something went wrong',
      error: {
        'code': 404,
        'description': 'Something went wrong!',
      },
    });
  }
}
const allOrderForSpecificUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);

    const result = await UserServices.allOrderForSpecificUserFromDB(userId);
    res.status(200).json({
      success: true,
      message: 'Order fetched successfully!',
      data: result,
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        'code': 404,
        'description': 'User not found!',
      },
    });
  }
}
const allOrderTotalPriceForSpecificUser = async (req: Request, res: Response) => {
  try {
    const userId = parseInt(req.params.userId);
    const result = await UserServices.allOrderTotalPriceForSpecificUserFromDB(userId);

    res.status(200).json({
      success: true,
      message: 'Total price calculated successfully!',
      data: result
    });
  } catch (err: any) {
    res.status(404).json({
      success: false,
      message: err.message || 'User not found',
      error: {
        'code': 404,
        'description': 'User not found!',
      },
    });
  }
}

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  appendNewProductInOrder,
  allOrderForSpecificUser,
  allOrderTotalPriceForSpecificUser
};
