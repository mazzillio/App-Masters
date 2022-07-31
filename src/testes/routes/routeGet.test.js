import request from "supertest";
import { serverExpress } from"../../server.js";
describe("Teste da rota / do servidor", () => {
    it("Deve ser possivel obter status 200 do servidor", async() =>{
        const response = await request(serverExpress)
        .get("/")
        .set("Accept", "application/json");
        expect(response.body).toStrictEqual({ alive:true });
        expect(response.status).toBe(200);
    });
});