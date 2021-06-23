import  { Router } from 'express';
import multer from 'multer';


import { CreateUserController } from '../modules/accounts/useCases/createUser/CreateUserController';
import { UpdatedUserAvatarController } from '../modules/accounts/useCases/updatedUserAvatar/UpdatedUserAvatarController';
import uploadConfig from '../config/upload';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const userRouter = Router();

const uploadAvatar = multer(uploadConfig.upload("./tmp/avatar"))

const createUserController = new CreateUserController();

const updateUserAvatarController = new UpdatedUserAvatarController()

userRouter.post("/", createUserController.handle)

userRouter.patch("/avatar", 
        ensureAuthenticated,
        uploadAvatar.single("avatar"),
        updateUserAvatarController.handle
    );
    

export { userRouter };
