import { VerifyFieldsEmpty } from "../../../useCases/validations/verifyFieldsEmpty";

describe("Suites para verificar campos vazios", ()=>{
    it("Deve ser possivel verificar quais tipos estão vazios", () => {
        const objectRequest = {
            name:"",
            email:"mateca500@gmail.com",
            deviceCount:0,
            zip:""
        }
        expect(VerifyFieldsEmpty(objectRequest)).toStrictEqual(["name","zip"]);
    });
    it("Deve ser possivel verificar que todos os campos estão preenchidos", () => {
        const objectRequest = {
            name:"mattheus",
            email:"mateca500@gmail.com",
            deviceCount:0,
            zip:"39404404"
        }
        expect(VerifyFieldsEmpty(objectRequest)).toStrictEqual([]);
    });
})