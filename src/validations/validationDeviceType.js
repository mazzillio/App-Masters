export function ValidationDevicesTypes(devices) {
    const validTypes = ["notebook","desktop","netbook","screen","printer","scanner"];
    const arrayOfInvalidTypes = [];
    Array.from(devices).forEach((device) => {
        const findType = validTypes.find((type) => 
            type.toLocaleLowerCase() === device.type.toLocaleLowerCase());
        if (!findType) {
            arrayOfInvalidTypes.push(device.type);
        }
    });
    return arrayOfInvalidTypes.length > 0 ? arrayOfInvalidTypes : [];
}