import { IDonationsRepository } from "../repository/donations/IDonatonRepository";

export class GetAllDonationsUseCase {
  constructor(private donationsRpository: IDonationsRepository) {}
  async execute() {
    const allDonations = await this.donationsRpository.listDonations();
    return allDonations;
  }
}
