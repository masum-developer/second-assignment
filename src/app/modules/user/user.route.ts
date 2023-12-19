import express from 'express';
import { UserControllers } from './user.controller';
const router = express.Router();

router.post('/', UserControllers.createUser);
router.get('/', UserControllers.getAllUser);
router.get('/:userId', UserControllers.getSingleUser);
router.put('/:userId', UserControllers.updateSingleUser);
router.delete('/:userId', UserControllers.deleteSingleUser);
router.put('/:userId/orders', UserControllers.appendNewProductInOrder);

export const UserRoutes = router;
