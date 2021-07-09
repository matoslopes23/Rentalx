import { Router } from "express";
import multer from 'multer';

import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationsController } from "@modules/cars/useCases/createCarSpecifications/CreateCarSpecificationsController";
import { UploadoCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";

import uploadConfig from '@config/upload';

const carsRouter = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationsController()
const uploadoCarImageController = new UploadoCarImageController();

const upload = multer(uploadConfig.upload("./tmp/cars"))

carsRouter.post("/",ensureAuthenticated, ensureAdmin, createCarController.handle);

carsRouter.get("/available", listAvailableCarsController.handle);

carsRouter.post("/specifications/:id",ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);

carsRouter.post("/images/:id",ensureAuthenticated,ensureAdmin, upload.array("images"), uploadoCarImageController.handle)


export {carsRouter}