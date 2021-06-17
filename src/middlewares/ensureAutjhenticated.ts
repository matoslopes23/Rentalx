import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken'

export async function ensureAuthenticated(request: Request, response:Response, next:NextFunction) {

    //Bearer minhjasidweidbnijsdnspomabsdid
    const authHeader = request.headers.authorization;

    if(!authHeader){
        throw new Error("Token missing");
    }

    const [, token] = authHeader.split(" ")

    try {
        const decoded = verify(token, "a4b18dcc866bd28894802edcd7f391ed");
        console.log(decoded);
    } catch {
        throw new Error("Invalid token!!")
    }
}