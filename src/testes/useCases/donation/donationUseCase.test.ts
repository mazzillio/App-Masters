import { AppError } from "../../../AppError";
import { DonationsInMemoryRepository } from "../../../repository/donations/DonationInMemoryRepository";
import { UserInMemoryRepository } from "../../../repository/users/UsersInMemoryRepository";
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
  const usersRepository = new UserInMemoryRepository();
  const donationsRepository = new DonationsInMemoryRepository();
  const donation = new DonationUseCase(usersRepository, donationsRepository);
  it("Não deve ser possivel realizar donation sem todos os campos obrigatorios", async () => {
    await expect(
      donation.execute(objectWithoutRequiredFields)
    ).rejects.toBeInstanceOf(AppError);
  });
  it("Não deve ser possivel realizar a donation com email invalido", async () => {
    await expect(donation.execute(objectWithEmailIncorrect)).rejects.toThrow(
      new Error("Email inválido")
    );
  });
  it("Não deve ser possivel realizar a donation com phone invalido", async () => {
    await expect(donation.execute(objectWithPhoneIncorrect)).rejects.toThrow(
      new Error("Phone inválido")
    );
  });
  it("Não deve ser possivel realizar a donation com zip invalido", async () => {
    await expect(donation.execute(objectWithZipIncorrect)).rejects.toThrow(
      new Error("Zip inválido")
    );
  });
  it("Não deve ser possivel realizar a donation com deviceCount e DeviceSent diferentes", async () => {
    await expect(
      donation.execute(objectWithDeviceCountDeviceSentDifferent)
    ).rejects.toThrow(
      new Error(
        "A quantidade de equipamentos (1) não está de acordo com as informações de equipamentos enviados (2)"
      )
    );
  });
  it("Não deve ser possivel realizar a donation com types de device incorretos", async () => {
    await expect(
      donation.execute(objectWithIncorrectTypeDevice)
    ).rejects.toThrow(
      new Error("types dos equipamentos notebok, desktp estão incorretos")
    );
  });
  it("Não deve ser possivel realizar a donation com values de device incorretos", async () => {
    await expect(
      donation.execute(objectWithIncorrectValueDevice)
    ).rejects.toThrow(
      new Error("Valor(es) do(s) equipamento(s) notebook estão incorretos")
    );
  });
  it("Deve ser possivel realizar a donation", async () => {
    await expect(donation.execute(correctObject)).resolves.not.toThrow();
  });
  it("Deve ser possivel verificar se a donation foi realizada", async () => {
    await donation.execute(correctObject);
    const [donation_] = await donationsRepository.listDonations();
    expect(donation_).toHaveProperty("id");
    expect(donation_.devices).toStrictEqual(correctObject.devices);
  });
});
