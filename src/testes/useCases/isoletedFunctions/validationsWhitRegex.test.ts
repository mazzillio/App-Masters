import {
  VerifyPhoneNumber,
  VerifyZip,
} from "../../../useCases/validations/vallidationsWithRegex";

describe("suite de testes para as funções de regex", () => {
  it("Não deve ser possivel validar zip com letras", () => {
    const zip = "aa53387as";
    expect(VerifyZip(zip)).toBe(false);
  });
  it("Não deve ser possivel validar zip com quantidade de numeros errada", () => {
    const zip1 = "1234567";
    const zip2 = "123456789";
    expect(VerifyZip(zip1)).toBe(false);
    expect(VerifyZip(zip2)).toBe(false);
  });
  it("Deve ser possivel validar um cep com e sem -", () => {
    const zip1 = "12345-678";
    const zip2 = "12345678";
    expect(VerifyZip(zip1)).toBe(true);
    expect(VerifyZip(zip2)).toBe(true);
  });
  it("Não deve ser possivel validar um numero com digitos incorretos", () => {
    const phone = "123456789";
    expect(VerifyPhoneNumber(phone)).toBe(false);
  });
  it("Deve ser possivel validar um numero com DDD", () => {
    const phone1 = "(38)998131291";
    const phone2 = "(038)998131291";
    const phone3 = "38998131291";
    expect(VerifyPhoneNumber(phone1)).toBe(true);
    expect(VerifyPhoneNumber(phone2)).toBe(true);
    expect(VerifyPhoneNumber(phone3)).toBe(true);
  });
  it("Deve ser possivel validar numero com -", () => {
    const phone1 = "(38)99813-1291";
    const phone2 = "03899813-1291";
    expect(VerifyPhoneNumber(phone1)).toBe(true);
    expect(VerifyPhoneNumber(phone2)).toBe(true);
  });
});
