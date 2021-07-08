import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController()


specificationRouter.post('/',ensureAuthenticated, ensureAdmin, createSpecificationController.handle)

export { specificationRouter};