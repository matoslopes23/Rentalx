import { Request, Response } from "express";
import { container } from "tsyringe";

import { AuthenticateUserUserCase } from "./AuthenticateUserUseCase";

 class AuthenticateUserUserController {
    async handle(request:Request, response:Response):Promise<Response>{
        const { password, email } = request.body;

        const authenticateUserUseCase = container.resolve(AuthenticateUserUserCase);

        const token = await authenticateUserUseCase.execute({
            password, 
            email,
        });

        return response.json(token);

    }

 }

export { AuthenticateUserUserController}