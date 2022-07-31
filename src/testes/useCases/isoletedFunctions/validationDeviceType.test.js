import { ValidationDevicesTypes } from "../../../useCases/validations/validationDeviceType";

describe("Suite de teste para validar o tipo do device", () => {
    it("Não deve ser possivel validar tipo errado", () => {
        const device =[
            {
                type:"notebook",
                condition:"work"
            },
            {
                type:"notebok",
                condition:"work"
            }
        ]
        expect(ValidationDevicesTypes(device).length).toBe(1);
    });
    it("Deve ser possivel validar os tipos dos devices", () => {
        const device =[
            {
                type:"notebook",
                condition:"work"
            },
            {
                type:"desktop",
                condition:"work"
            }
        ]
        expect(ValidationDevicesTypes(device).length).toBe(0);
    });
})