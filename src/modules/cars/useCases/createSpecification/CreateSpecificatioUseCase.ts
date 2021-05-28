import { ISpecificationRepository } from "../../repositories/ISpecificationRepository"

interface IRequest {
    name: string;
    description:string;
}

class CreateSpecificationUseCase {
    constructor(private specificationsRepository: ISpecificationRepository){

    }

    exute({name, description}: IRequest){
        const specificationAlreadyExists = this.specificationsRepository.findByName(name)

        if(specificationAlreadyExists){
            throw new Error("Specification already Exists!")
        }
        this.specificationsRepository.create({
            name,
            description,
        })
    }
}

export {CreateSpecificationUseCase}