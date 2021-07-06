import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { ICategoriesRepository } from "@modules/cars/repositories/ICategoriesRepository";

interface IRequest {
    name: string;
    description:string;
}


@injectable()
class  CreateCategoryUseCase{
    
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    
    ) {}
    async execute({description, name}: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if(categoryAlreadyExists){
            throw new AppError("Category Alread exists")
            
        }


        this.categoriesRepository.create({name, description})
    }

}

export { CreateCategoryUseCase}