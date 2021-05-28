import {Router} from 'express'
import { categoriesRoutes } from './categories.routes';
import { specificationRouter } from './specification.routes';

categoriesRoutes
const  router = Router();

router.use("/categories", categoriesRoutes)
router.use("/specifications", specificationRouter)

export{router}