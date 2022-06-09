import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { inject, injectable } from "tsyringe";
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";

interface IRequest {
    email:string;
    password:string;
}
interface IResponse {
    user:{
        name:string,
        email:string
    },
    token: string;
} 

@injectable()
class AuthenticateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository:IUsersRepository
    ){}
    async execute({ email, password }:IRequest): Promise<IResponse> {
        // Usuario existe
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new AppError("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        // Senha está incorreta 
        if(!passwordMatch){
            throw new AppError("Email or password incorrect");
        }

        // Gerar o jsonwebtoken
        const token = sign({},"a4b18dcc866bd28894802edcd7f391ed",{
            subject:user.id,
            expiresIn: "1d"

        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name:user.name,
                email:user.email,

            },
        }
        
        return tokenReturn;
    }
}

export { AuthenticateUserUseCase }