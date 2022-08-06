import { randomUUID } from "crypto";

import { IDonationRequest } from "../../interfaces/IDonationRequest";
import { IDonationsRepository } from "./IDonatonRepository";

export class DonationsInMemoryRepository implements IDonationsRepository {
  private donations: any[] = [];
  async saveDonation(donationRequest: IDonationRequest): Promise<void> {
    this.donations.push({
      id: randomUUID(),
      zip: donationRequest.zip,
      streetAdress: donationRequest.streetAddress,
      number: donationRequest.number,
      neightborhood: donationRequest.neighborhood,
      complement: donationRequest.complement,
      city: donationRequest.city,
      state: donationRequest.state,
      userId: donationRequest.userId,
      deviceCount: donationRequest.deviceCount,
      devices: donationRequest.devices,
    });
  }
  async listDonations(): Promise<any[]> {
    return this.donations;
  }
}
