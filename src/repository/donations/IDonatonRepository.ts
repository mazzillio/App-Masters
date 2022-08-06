import { IDonationRequest } from "../../interfaces/IDonationRequest";

export interface IDonationsRepository {
  saveDonation(donationRequest: IDonationRequest): Promise<void>;
  listDonations(): Promise<any[]>;
}
