import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository"
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

interface IRequest {
    name: string;
    description:string;
}
/**
 * [] -Definir o tipo de retorno 
 * [] - alterar o retorno de erro
 * [] - acessar o repositorio
 * /[] - retornar algo
 */
class  CreateCategoryUseCase{
    constructor(private categoriesRepository: ICategoriesRepository){


    }
    async execute({description, name}: IRequest): Promise<void> {
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name)

        if(categoryAlreadyExists){
            throw new Error("Category Alread exists")
            
        }


        this.categoriesRepository.create({name, description})
    }

}

export { CreateCategoryUseCase}