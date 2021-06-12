import { IUsersRepository } from "../../repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken"
import { compare } from "bcrypt"


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

injectable()
class AuthenticateUserUserCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository:IUsersRepository
    ){}
    async execute({ email, password}:IRequest): Promise<IResponse> {
        // Usuario existe
        const user = await this.usersRepository.findByEmail(email);

        if(!user){
            throw new Error("Email or password incorrect");
        }

        const passwordMatch = await compare(password, user.password);

        // Senha está correta 
        if(!passwordMatch){
            throw new Error("Email or password incorrect");
        }

        // Gerar o jsonwebtoken
        const token = sign({},"52ede99f8ca87482b7af042639852f6b",{
            subject:user.id,
            expiresIn: "1d"

        });
        return {
            user, 
            token,
        }
    }
}

export {AuthenticateUserUserCase}