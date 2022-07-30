export function ValidationFields(devices) {
    const requiredFields = 
    [
        "name","email","phone",
        "zip","city","state",
        "streetAddress","number","complement","neighborhood",
        "deviceCount","devices"
    ];
    const missingFields = [];
    const fields=[]
    for(const field in devices){
        fields.push(field)
    }
    requiredFields.forEach((requiredField) => {
        const findField = fields.find((field) => field === requiredField);
        if(!findField) {
            missingFields.push(requiredField);
        }

    })
    return missingFields.length > 0 ? missingFields : [];
};