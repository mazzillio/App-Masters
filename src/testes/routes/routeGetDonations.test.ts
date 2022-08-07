/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";

import { serverExpress } from "../../server";

describe("Teste da rota get /donation do servidor", () => {
  it("Api deve retornar sucesso", async () => {
    const response = await request(serverExpress).get("/donation");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThanOrEqual(1);
  });
});
