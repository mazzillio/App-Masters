import { VerifyFieldsEmpty } from "../../../useCases/validations/verifyFieldsEmpty";

describe("Suites para verificar campos vazios", () => {
  it("Deve ser possivel verificar quais tipos estão vazios", () => {
    const objectRequest = {
      name: "",
      email: "mateca500@gmail.com",
      phone: "(38)3213-1291",
      zip: "",
      city: "montes claros",
      state: "minas fgerais",
      streetAddress: "rua b",
      number: "490",
      deviceCount: 0,
      neighborhood: "santos dumont",
      devices: [{ type: "notebook", condition: "working" }],
    };
    expect(VerifyFieldsEmpty(objectRequest)).toStrictEqual(["name", "zip"]);
  });
  it("Deve ser possivel verificar que todos os campos estão preenchidos", () => {
    const objectRequest = {
      name: "mate",
      email: "mate@mat.com",
      phone: "(38)3213-1291",
      zip: "39404404",
      city: "montes claros",
      state: "minas fgerais",
      streetAddress: "rua b",
      number: "490",
      complement: "",
      neighborhood: "santos dumont",
      deviceCount: 1,
      devices: [{ type: "notebook", condition: "working" }],
    };
    expect(VerifyFieldsEmpty(objectRequest)).toStrictEqual([]);
  });
});
