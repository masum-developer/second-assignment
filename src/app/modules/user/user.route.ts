import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();
// user route
router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateSingleUser);
router.delete('/:userId', UserControllers.deleteSingleUser);

// order route
router.put('/:userId/orders', UserControllers.appendNewProductInOrder);
router.get('/:userId/orders', UserControllers.allOrderForSpecificUser);
router.get('/:userId/orders/total-price', UserControllers.allOrderTotalPriceForSpecificUser);

export const UserRoutes = router;
