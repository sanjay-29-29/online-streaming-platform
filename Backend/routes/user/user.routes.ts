import express from 'express';
import * as userController from '../../controller/user/user.controller';
import { validateDTO } from '../../middleware/validation.middleware';
import { CreateUserDTO } from '../../dtos/user/user.dtos';
import { USER_ROUTES } from '../../constants/routers.constants';
const userRouter = express.Router();

// userRouter.post('/login',validateDTO(UserIdentityDTO), userController.loginUser);
userRouter.post(USER_ROUTES.CREATE,validateDTO(CreateUserDTO), userController.createUser);
userRouter.get('/update',userController.updateUser);
// userRouter.get('/delete',userController.deleteUser);
// userRouter.get('/getAll',userController.getAllUser);
// userRouter.get('/getById',userController.getUserById);

export default userRouter;