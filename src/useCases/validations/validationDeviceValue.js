export function ValidationDevicesValues(devices) {
    const validValues = ["working","notWorking","broken"];
    const arrayOfInvalidValues = [];
    Array.from(devices).forEach((device) => {
        const findValue = validValues.find((condition) => 
            condition.toLocaleLowerCase() === device?.condition.toLocaleLowerCase());
        if (!findValue) {
            arrayOfInvalidValues.push(device.type);
        }
    });
    return arrayOfInvalidValues;
}