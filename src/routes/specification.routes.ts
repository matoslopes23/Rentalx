import { Router } from 'express';

import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRouter = Router();

const createSpecificationController = new CreateSpecificationController()

specificationRouter.post('/', createSpecificationController.handle)

export { specificationRouter};