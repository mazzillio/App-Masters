import { DonationsInMemoryRepository } from "../../../repository/donations/DonationInMemoryRepository";
import { UserInMemoryRepository } from "../../../repository/users/UsersInMemoryRepository";
import { DonationUseCase } from "../../../useCases/DonationUseCase";
import { GetAllDonationsUseCase } from "../../../useCases/GetAllDonationsUseCase";

describe("suite de testes para o caso de uso getAllconations", () => {
  const usersRepository = new UserInMemoryRepository();
  const donationsRepoisoty = new DonationsInMemoryRepository();
  const createDonation = new DonationUseCase(
    usersRepository,
    donationsRepoisoty
  );
  const listDonations = new GetAllDonationsUseCase(donationsRepoisoty);
  beforeAll(async () => {
    await createDonation.execute({
      name: "mattheus",
      email: "mateca500@gmail.com",
      phone: "38988112233",
      city: "moc",
      state: "minas fgerais",
      streetAddress: "rua b",
      zip: "39404404",
      number: "490",
      complement: "casa",
      neighborhood: "santos dumont",
      deviceCount: 2,
      devices: [
        { type: "notebook", condition: "working" },
        { type: "desktop", condition: "working" },
      ],
    });
    await createDonation.execute({
      name: "mattheus",
      email: "mateca500@gmail.com",
      phone: "38988112233",
      city: "moc",
      state: "minas fgerais",
      streetAddress: "rua b",
      zip: "39404404",
      number: "490",
      complement: "casa",
      neighborhood: "santos dumont",
      deviceCount: 4,
      devices: [
        { type: "screen", condition: "working" },
        { type: "scanner", condition: "working" },
        { type: "netbook", condition: "working" },
        { type: "notebook", condition: "notWorking" },
      ],
    });
  });
  it("Deve ser possivel retornar a lista de donations", async () => {
    await expect(listDonations.execute()).resolves.not.toThrow();
    const donations = await listDonations.execute();
    expect(donations.length).toBe(2);
  });
});
