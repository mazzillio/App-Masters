import { IDevice } from "../../interfaces/IDevice";

export function ValidationDevicesTypes(devices: IDevice[]): string[] {
  const validTypes = [
    "notebook",
    "desktop",
    "netbook",
    "screen",
    "printer",
    "scanner",
  ];
  const arrayOfInvalidTypes: string[] = [];
  Array.from(devices).forEach((device: IDevice) => {
    const findType = validTypes.find(
      (type) => type.toLocaleLowerCase() === device.type.toLocaleLowerCase()
    );
    if (!findType) {
      arrayOfInvalidTypes.push(device.type);
    }
  });
  return arrayOfInvalidTypes.length > 0 ? arrayOfInvalidTypes : [];
}
