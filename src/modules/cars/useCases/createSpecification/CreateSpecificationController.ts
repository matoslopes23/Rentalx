import {Request, Response} from 'express';
import { container } from 'tsyringe'
import { CreateSpecificationUseCase } from './CreateSpecificatioUseCase';

class CreateSpecificationController{
        
        async handle(request: Request, response:Response): Promise<Response>{
            const { name, description} = request.body;

            const createSpecicationUseCase = container.resolve(CreateSpecificationUseCase);
        
            await createSpecicationUseCase.exute({name, description});
        
            return response.status(201).send()
        }
}
export {CreateSpecificationController}