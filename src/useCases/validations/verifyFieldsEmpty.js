export function VerifyFieldsEmpty(objetoRequest) {
    const fieldsEmpty = [];
    const optionalsFiels =["email","complement"]
    for(const keyField in objetoRequest) {
        const valueField = objetoRequest[keyField];
        if(keyField !== "deviceCount" && valueField !==0) {
            if(!optionalsFiels.includes(keyField) && !valueField) {
                fieldsEmpty.push(keyField);
            }
        }
    }
    return fieldsEmpty;
};