import { IDonationRequest } from "../../../interfaces/IDonationRequest";

export const correctObject: IDonationRequest = {
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
};
