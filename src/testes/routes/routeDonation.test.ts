/* eslint-disable import/no-extraneous-dependencies */
import request from "supertest";

import { serverExpress } from "../../server";

describe("Teste da rota /donation do servidor", () => {
  const objectRequest = {
    email: "mateca500@gmail.com",
    phone: "(38)3213-1291",
    zip: "39404404",
    city: "montes claros",
    state: "minas fgerais",
    streetAddress: "rua b",
    number: "490",
    complement: "casa",
    neighborhood: "santos dumont",
    deviceCount: 2,
    devices: [
      { type: "notebook", condition: "working" },
      { type: "desktop", condition: "working" },
    ],
  };
  const objectRequestWithoutDevices = {
    name: "mattheus",
    email: "mateca500@gmail.com",
    phone: "(38)3213-1291",
    zip: "39404404",
    city: "montes claros",
    state: "minas fgerais",
    streetAddress: "rua b",
    number: "490",
    complement: "casa",
    neighborhood: "santos dumont",
    deviceCount: 2,
  };
  const completedObject = {
    name: "mattheus",
    ...objectRequest,
    devices: [
      {
        type: "notebook",
        condition: "working",
      },
    ],
  };
  const objectWithTypeInvalid = {
    name: "mattheus",
    ...objectRequest,
    devices: [
      {
        type: "notebook",
        condition: "working",
      },
      {
        type: "Computador",
        condition: "working",
      },
    ],
  };
  const correctObject = {
    name: "mattheus",
    ...objectRequest,
    devices: [
      {
        type: "notebook",
        condition: "working",
      },
      {
        type: "desktop",
        condition: "notWorking",
      },
    ],
  };
  it("Api deve retornar 400 pela falta de campos", async () => {
    const response = await request(serverExpress)
      .post("/donation")
      .send(objectRequest);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(true);
    expect(response.body).toHaveProperty("errorMessage");
    expect(response.status).toBe(400);
  });
  it("Api deve retornar mensagem especifica para email invalido", async () => {
    Object.assign(objectRequest, {
      email: "mateca500gmail.com",
    });
    const response = await request(serverExpress)
      .post("/donation")
      .send({ name: "mattheus", ...objectRequest });
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(true);
    expect(response.body).toHaveProperty("errorMessage");
    expect(response.body.errorMessage).toStrictEqual("Email inválido");
    expect(response.status).toBe(400);
  });
  it("Api deve retornar falha pela falta de devices", async () => {
    const response = await request(serverExpress)
      .post("/donation")
      .send(objectRequestWithoutDevices);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(true);
    expect(response.body).toHaveProperty("errorMessage");
    expect(response.body.errorMessage).toStrictEqual(
      "Todos os campos obrigatórios devem ser informados:"
    );
    expect(response.body).toHaveProperty("requiredFields");
    expect(response.body.requiredFields).toStrictEqual(["devices"]);
    expect(response.status).toBe(400);
  });
  it("Api deve retornar falha pela diferença entre devices passados e deviceCount", async () => {
    const response = await request(serverExpress)
      .post("/donation")
      .send(completedObject);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(true);
    expect(response.body).toHaveProperty("errorMessage");
    expect(response.body.errorMessage).toStrictEqual(
      "A quantidade de equipamentos (2) não está de acordo com as informações de equipamentos enviados (1)"
    );
    expect(response.status).toBe(400);
  });
  it("Api deve retornar falha por tipo de device invalido", async () => {
    const response = await request(serverExpress)
      .post("/donation")
      .send(objectWithTypeInvalid);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe(true);
    expect(response.body).toHaveProperty("errorMessage");
    expect(response.body.errorMessage).toStrictEqual(
      "types dos equipamentos Computador estão incorretos"
    );
    expect(response.status).toBe(400);
  });
  it("Api deve retornar sucesso", async () => {
    const response = await request(serverExpress)
      .post("/donation")
      .send(correctObject);
    expect(response.body).toStrictEqual({ sucess: true });
    expect(response.status).toBe(200);
  });
});
