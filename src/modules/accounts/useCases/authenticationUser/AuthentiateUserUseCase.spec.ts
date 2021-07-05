import { AppError } from "../../../../errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepositoryInMemory } from "../../repositories/in-memory/UserRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase : AuthenticateUserUseCase;
let usersRepositoryInMemory : UserRepositoryInMemory;
let createUserUserCase : CreateUserUseCase;

describe("Authenticate User", ()=>{
    
    beforeEach(()=>{
        usersRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
        createUserUserCase = new CreateUserUseCase(usersRepositoryInMemory)
    })
    it("should be able to authenticate an user",async ()=>{
        const user: ICreateUserDTO = {
            driver_license:"0202151",
            email: "user@test.com",
            password:"12365",
            name:"User Test"
        };
        await  createUserUserCase.execute(user);

        const result =  await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        
        expect(result).toHaveProperty("token")
    });

    it("shold not be able to authenticate an nonexistent user", ()=>{
        expect(async ()=>{
            await authenticateUserUseCase.execute({
                email: "false@gmail.com",
                password: "151841"
            });
        }).rejects.toBeInstanceOf(AppError)
    });

    it("should not be able to authenticate with incorret password", ()=>{
        expect(async()=>{
            const user:ICreateUserDTO = {
                driver_license:"9999",
                email:"@usrer.com",
                password:"4545",
                name:"User Test Error"
            }
            await createUserUserCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incoreetPassword"
            })
        }).rejects.toBeInstanceOf(AppError);
    })
})