import { IDevice } from "../../interfaces/IDevice";
import { IDonationRequest } from "../../interfaces/IDonationRequest";

export function VerifyFieldsEmpty(objetoRequest: IDonationRequest): string[] {
  type typesDonation = {
    name: string;
    email: string;
    phone: string;
    zip: string;
    city: string;
    state: string;
    streetAddress: string;
    number: string;
    complement: string;
    neighborhood: string;
    deviceCount: number;
    devices: IDevice[];
  };
  const fieldsEmpty: string[] = [];
  const optionalsFiels = ["email", "complement"];
  Object.entries(objetoRequest).forEach(([key]) => {
    type ObjectKey = keyof typesDonation;
    const valueField = objetoRequest[key as ObjectKey];
    if (key !== "deviceCount" && valueField !== 0) {
      if (!optionalsFiels.includes(key) && !valueField) {
        fieldsEmpty.push(key);
      }
    }
  });
  return fieldsEmpty;
}
