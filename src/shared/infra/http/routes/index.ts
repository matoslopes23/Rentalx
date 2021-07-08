import {Router} from 'express';

import { authenticateRoutes } from './authenticate.routes';
import { categoriesRoutes } from './categories.routes';
import { specificationRouter } from './specification.routes';
import { userRouter } from './users.routes';
import { carsRouter } from './cars.routes';


const  router = Router();

router.use("/categories", categoriesRoutes);
router.use("/specifications", specificationRouter);
router.use("/users", userRouter);
router.use("/cars", carsRouter);
router.use(authenticateRoutes);

export{ router }