import { AppError } from "../../../AppError";
import { DonationUseCase } from "../../../useCases/DonationUseCase";
import { objectWithoutRequiredFields} from "./objectWithoutRequiredFields";
import { objectWithEmptyFields} from "./objectWithEmptyFields";
import { objectWithEmailIncorrect } from "./objectWithEmailIncorrect";
import { objectWithPhoneIncorrect } from "./obejectWithPhoneIncorrect";
import { objectWithZipIncorrect } from "./objectWithZipiIncorrect";
import { objectWithDeviceCountDeviceSentDifferent } from "./objectWithDeviceCountDeviceSentDifferent";
import { objectWithIncorrectTypeDevice } from "./objectWithIncorrectTypeDevice";
import { objectWithIncorrectValueDevice } from "./objectWtihIncorrectValueDevice";
import { correctObject } from "./correctObject";
describe("Suite de teste para o caso de uso donation", () =>{
    const donation = new DonationUseCase();
    it("Não deve ser possivel realizar donation sem todos os campos obrigatorios", () =>{
        const error = new AppError(
            "Todos os campos obrigatórios devem ser informados:", 400 ,["name","zip"]
        )
        expect(()=> donation.execute(objectWithoutRequiredFields)).toThrow(error)
    })
    it("Não deve ser possivel realizar a donation com campos vazios",() => {
        const error = new Error("Os campos email, city, zip não podem ser vazios") 
        expect(() => donation.execute(objectWithEmptyFields))
        .toThrow(error)
    });
    it("Não deve ser possivel realizar a donation com email invalido", ()=> {
        expect(() => donation.execute(objectWithEmailIncorrect))
        .toThrow(new Error("Email inválido"));
    });
    it("Não deve ser possivel realizar a donation com phone invalido", ()=> {
        expect(() => donation.execute(objectWithPhoneIncorrect))
        .toThrow(new Error("Phone inválido"));
    });
    it("Não deve ser possivel realizar a donation com zip invalido", ()=> {
        expect(() => donation.execute(objectWithZipIncorrect))
        .toThrow(new Error("Zip inválido"));
    });
    it("Não deve ser possivel realizar a donation com deviceCount e DeviceSent diferentes",
        () => {
        expect(() => donation.execute(objectWithDeviceCountDeviceSentDifferent))
        .toThrow(new Error(
            "A quantidade de equipamentos (1) não está de acordo com as informações de equipamentos enviados (2)"
        ));
    });
    it("Não deve ser possivel realizar a donation com types de device incorretos", () =>{
        expect(()=> donation.execute(objectWithIncorrectTypeDevice))
        .toThrow(new Error("types dos equipamentos notebok, desktp estão incorretos"))
    })
    it("Não deve ser possivel realizar a donation com values de device incorretos", () => {
        expect(() => donation.execute(objectWithIncorrectValueDevice))
        .toThrow(new Error("Valor(es) do(s) equipamento(s) notebook estão incorretos"));
    })
    it("Deve ser possivel realizar a donation", () => {
        expect(() => donation.execute(correctObject)).not.toThrow();
    })



})