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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Something Wrong',
      error: {
        'code': 500,
        'description': 'Something Wrong',
        'emn': err
      },
    });
  }
};
const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
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
const deleteSingleUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
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

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleStudent,
  deleteSingleUser,
};
