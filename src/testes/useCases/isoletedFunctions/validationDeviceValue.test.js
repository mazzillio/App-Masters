import { ValidationDevicesValues } from "../../../useCases/validations/validationDeviceValue";

describe("Suite de teste para validar os valores do device", () => {
    it("Não deve ser possivel validar os valores dos devices", ()=>{
        const devices =[
            {
                type:"notebook",
                condition:"work"
            },
            {
                type:"notebok",
                condition:"notWork"
            },
            {
                type:"notebok",
                condition:"broke"
            }
        ]
        expect(ValidationDevicesValues(devices).length).toBe(3);
    })
    it("Deve ser possivel validar os values dos devices", () => {
        const devices =[
            {
                type:"notebook",
                condition:"working"
            },
            {
                type:"notebok",
                condition:"notWorking"
            },
            {
                type:"notebok",
                condition:"broken"
            }
        ]
        expect(ValidationDevicesValues(devices).length).toBe(0);
    });
});