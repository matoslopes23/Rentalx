import {Router} from 'express'
import { categoriesRoutes } from './categories.routes';
import { specificationRouter } from './specification.routes';
import { userRouter } from './users.routes';


const  router = Router();

router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationRouter)
router.use("/users", userRouter)

export{ router }