export function ValidationFields(devices: object): string[] {
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

  const fields: string[] = [];
  const missingFields: Set<string> = new Set();
  Object.keys(devices).forEach((key: string) => fields.push(key));
  requiredFields.forEach((requiredField) => {
    const findField = fields.find((field) => field === requiredField);
    if (!findField) {
      missingFields.add(requiredField);
    }
  });
  Object.entries(devices).forEach(([key, value]) => {
    if (!["email", "complement"].includes(key)) {
      if (!value) {
        missingFields.add(key);
      }
    }
  });
  return Array.from(missingFields);
}
