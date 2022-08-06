import { AppError } from "../../../AppError";
import { DonationUseCase } from "../../../useCases/DonationUseCase";
import { correctObject } from "./correctObject";
import { objectWithPhoneIncorrect } from "./obejectWithPhoneIncorrect";
import { objectWithDeviceCountDeviceSentDifferent } from "./objectWithDeviceCountDeviceSentDifferent";
import { objectWithEmailIncorrect } from "./objectWithEmailIncorrect";
import { objectWithIncorrectTypeDevice } from "./objectWithIncorrectTypeDevice";
import { objectWithoutRequiredFields } from "./objectWithoutRequiredFields";
import { objectWithZipIncorrect } from "./objectWithZipiIncorrect";
import { objectWithIncorrectValueDevice } from "./objectWtihIncorrectValueDevice";

describe("Suite de teste para o caso de uso donation", () => {
  const donation = new DonationUseCase();
  it("Não deve ser possivel realizar donation sem todos os campos obrigatorios", () => {
    expect(() => donation.execute(objectWithoutRequiredFields)).toThrow(
      AppError
    );
  });
  it("Não deve ser possivel realizar a donation com email invalido", () => {
    expect(() => donation.execute(objectWithEmailIncorrect)).toThrow(
      new Error("Email inválido")
    );
  });
  it("Não deve ser possivel realizar a donation com phone invalido", () => {
    expect(() => donation.execute(objectWithPhoneIncorrect)).toThrow(
      new Error("Phone inválido")
    );
  });
  it("Não deve ser possivel realizar a donation com zip invalido", () => {
    expect(() => donation.execute(objectWithZipIncorrect)).toThrow(
      new Error("Zip inválido")
    );
  });
  it("Não deve ser possivel realizar a donation com deviceCount e DeviceSent diferentes", () => {
    expect(() =>
      donation.execute(objectWithDeviceCountDeviceSentDifferent)
    ).toThrow(
      new Error(
        "A quantidade de equipamentos (1) não está de acordo com as informações de equipamentos enviados (2)"
      )
    );
  });
  it("Não deve ser possivel realizar a donation com types de device incorretos", () => {
    expect(() => donation.execute(objectWithIncorrectTypeDevice)).toThrow(
      new Error("types dos equipamentos notebok, desktp estão incorretos")
    );
  });
  it("Não deve ser possivel realizar a donation com values de device incorretos", () => {
    expect(() => donation.execute(objectWithIncorrectValueDevice)).toThrow(
      new Error("Valor(es) do(s) equipamento(s) notebook estão incorretos")
    );
  });
  it("Deve ser possivel realizar a donation", () => {
    expect(() => donation.execute(correctObject)).not.toThrow();
  });
});
