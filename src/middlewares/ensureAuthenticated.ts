import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { UsersRepository } from '../modules/accounts/repositories/implementations/UsersRepository';

interface IPayload {
    sub:string;
}

export async function ensureAuthenticated(request: Request, response:Response, next:NextFunction) {

    //Bearer minhjasidweidbnijsdnspomabsdid
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("Token missing");
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, "a4b18dcc866bd28894802edcd7f391ed") as IPayload;
        
        const usersRepository = new UsersRepository();

        const user = await usersRepository.findById(user_id)

        if(!user){
            throw new Error("Users does not exists")
        }

        next();
    } catch {
        throw new Error("Invalid token!!")
    }
}