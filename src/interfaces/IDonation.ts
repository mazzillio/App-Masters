import { IDevice } from "./IDevice";

export interface IDonation {
  userId: string;
  zip: string;
  city: string;
  state: string;
  streetAddress: string;
  number: string;
  complement?: string;
  neighborhood: string;
  deviceCount: number;
  devices: IDevice[];
}
