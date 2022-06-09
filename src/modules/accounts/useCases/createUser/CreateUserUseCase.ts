import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs";

import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { User } from "@modules/accounts/infra/typeorm/entities/User";

interface IResponse {
    user:{
        name:string,
        email:string
    }

} 

@injectable()
class CreateUserUseCase {

    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ){}

    async findAllUsers(): Promise<User[]>{
        const users = await this.usersRepository.findAll()
        // const userReturn : IResponse = {
        //     user : {
        //         name
        //     }
        // }
        return users
    }

    async execute({
        name, 
        email, 
        password, 
        driver_license
    }: ICreateUserDTO): Promise<void>{

        const userAlreadExists = await this.usersRepository.findByEmail(email);

        if(userAlreadExists){
            throw new AppError("Users alread exists");
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        })
    }
}

export {CreateUserUseCase};