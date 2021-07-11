import request from "supertest";
import { hash } from "bcryptjs";
import { v4 as uuid } from "uuid";
import { Connection } from "typeorm";

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm"

let connection:Connection;

describe("Create Categoy controller",()=>{

    beforeAll(async () =>{
        connection = await createConnection();
        await connection.runMigrations();
        
        const id = uuid();
        const password = await hash("admin", 8)

        await connection.query(
            `INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license ) 
                values('${id}','admin', 'admin@rentx.com.br','${password}', true, 'now()', 'xxxxxx')
            `
        )
    });

    afterAll(async()=>{
        await connection.dropDatabase();
        await connection.close()
    })
    it("should be able to create a new category", async ()=>{
        const responseToken = await request(app).post("/sessions").send({
            email:"admin@rentx.com.br",
            password:"admin"
        });
        const { token } = responseToken.body;

        

        const response = await request(app).post("/categories").send({
            name:"Category Superttest",
            description:"Category supertest"
        }).set({
            Authorization: `Bear ${token}`
        })

        expect(response.status).toBe(201);
    })
    it("sould not be able to create a new category with  name exists", async ()=>{
        const responseToken = await request(app).post("/sessions").send({
            email:"admin@rentx.com.br",
            password:"admin"
        });
        const { token } = responseToken.body;

        
        const response = await request(app).post("/categories").send({
            name:"Category Superttest",
            description:"Category supertest"
        }).set({
            Authorization: `Bear ${token}`
        })
       

        expect(response.status).toBe(400);
    })
    
})