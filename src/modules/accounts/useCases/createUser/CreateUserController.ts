import {Request, Response} from 'express'
import { container } from 'tsyringe';
import { CreateUserUseCase } from './CreateUserUseCase';

class CreateUserController {

    async handle(request:Request, response:Response): Promise<Response>{
        const {name, email, password, driver_license} = request.body;
        const createUserUseCase = container.resolve(CreateUserUseCase);

        await createUserUseCase.execute({
            name, 
            email,
            password, 
            driver_license
        })
        return response.status(201).send('Usuário cadastrado com sucesso');
    }

    async findAllUsers(request:Request, response:Response): Promise<Response> {
        const createUserUseCase = container.resolve(CreateUserUseCase);

        const users = await createUserUseCase.findAllUsers()

        return response.status(200).json(users)

    }
}
export  { CreateUserController };