import { ValidationFields } from "../../../useCases/validations/validationFields";

describe("Suite de testes para verificar os campos requeridos", () =>{
    it("Deve ser possivel saber quais campos requeridos estão faltando", () => {
        const fields = {
            name:"mattheus",
            phone:"38991831291",
            zip:"39404404",
            number:"4",
            neighborhood:"Santos",
            deviceCount:1,
            devices:[]
        }
        expect(ValidationFields(fields)).toStrictEqual([
            "city",
            "state",
            "streetAddress",
        ])
    });
    it("Deve ser possivel verificar todos os campos requeridos", () => {
        const fields = {
            name:"mattheus",
            phone:"38991831291",
            zip:"39404404",
            number:"4",
            neighborhood:"Santos",
            state:"mg",
            streetAddress:"B",
            city:"moc",
            deviceCount:1,
            devices:[]
        }
        expect(ValidationFields(fields)).toStrictEqual([])
    });
})