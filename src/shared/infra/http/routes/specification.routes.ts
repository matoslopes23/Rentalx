import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController()

specificationRouter.use(ensureAuthenticated);

specificationRouter.post('/', createSpecificationController.handle)

export { specificationRouter};