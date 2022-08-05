import { IDonationRequest } from "../../interfaces/IDonationRequest";

export function ValidationFields(devices: IDonationRequest): string[] {
  const requiredFields = [
    "name",
    "phone",
    "zip",
    "city",
    "state",
    "streetAddress",
    "number",
    "neighborhood",
    "deviceCount",
    "devices",
  ];
  const missingFields: string[] = [];
  const fields: string[] = [];
  Object.keys(devices).forEach((key: string) => fields.push(key));
  requiredFields.forEach((requiredField) => {
    const findField = fields.find((field) => field === requiredField);
    if (!findField) {
      missingFields.push(requiredField);
    }
  });
  return missingFields;
}
