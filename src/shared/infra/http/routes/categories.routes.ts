import { Router } from 'express';
import multer from "multer"

import {CreateCategoryController} from "@modules/cars/useCases/createCategory/CreateCategoryController"
import { ListCategoriesController } from '@modules/cars/useCases/listCategories/ListCategoriesController';
import { ImportCategoryController } from '@modules/cars/useCases/importCategory/ImportCategoryController';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { ensureAdmin } from '../middlewares/ensureAdmin';


const categoriesRoutes = Router();


const upload = multer({
   dest: "./tmp",
});

const createCategoryController = new CreateCategoryController();

const importCategoryController = new ImportCategoryController();

const listCategoriesController = new ListCategoriesController();

categoriesRoutes.post("/",ensureAuthenticated, ensureAdmin, createCategoryController.handle)

categoriesRoutes.get("/", listCategoriesController.handle);

categoriesRoutes.post("/import",ensureAuthenticated,ensureAdmin, upload.single("file"), importCategoryController.handle);

export { categoriesRoutes }