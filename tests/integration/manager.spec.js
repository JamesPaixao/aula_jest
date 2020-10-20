const request = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/database")
const {cpf} = require("cpf-cnpj-validator");
const truncate = require("./truncate");

describe("MANAGERS", () => {

    afterAll(() => {
        connection.close();
    });

    beforeEach(async (done) => {
        await truncate(connection.models);
        done();
    });

    it("é possível criar um novo gerente", async () => {
        const response = await request(app).post("/managers".send({
           name: "James Paixão",
           cpf: cpf.generate(),
           email: "teste@gmail.com",
           cellphone: "5511962090233",
           password: "123456", 
        }));
        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty();
    });

    it("não é possível cadastrar um gerente com cpf existente", async () => {
        let cpfGerente = cpf.generate();
        let response = await request(app).post("/managers".send({
            name: "Alisson",
            cpf: cpfGerente,
            email: "teste@gmail.com",
            cellphone: "5511962090233",
            password: "123456", 
         }));

         expect(response.ok).toBeFalsy();
         expect(response.body).toHaveProperty("error");
         expect(response.body.error).toEqual("cpf already exists");
    })
});