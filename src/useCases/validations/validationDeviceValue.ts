import { IDevice } from "../../interfaces/IDevice";

export function ValidationDevicesValues(devices: IDevice[]): string[] {
  const validValues = ["working", "notWorking", "broken"];
  const arrayOfInvalidValues: string[] = [];
  Array.from(devices).forEach((device: IDevice) => {
    const findValue = validValues.find(
      (condition) =>
        condition.toLocaleLowerCase() === device?.condition.toLocaleLowerCase()
    );
    if (!findValue) {
      arrayOfInvalidValues.push(device.type);
    }
  });
  return arrayOfInvalidValues;
}
