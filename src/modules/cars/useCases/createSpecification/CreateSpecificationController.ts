
import {Request, Response} from 'express'
import { CreateSpecificationUseCase } from './CreateSpecificatioUseCase';

class CreateSpecificationController{
        constructor(private createSpecicationUseCase: CreateSpecificationUseCase) {

        }
        handle(request: Request, response:Response): Response{
            const { name, description} = request.body;

        
            this.createSpecicationUseCase.exute({name, description});
        
            return response.status(201).send()
        }
}
export {CreateSpecificationController}