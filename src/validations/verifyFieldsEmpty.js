export function VerifyFieldsEmpty(objetoRequest) {
    const fieldsEmpty = [];
    for(const keyField in objetoRequest) {
        const valueField = objetoRequest[keyField];
        if(keyField !== "deviceCount" && valueField !==0) {
            if(!valueField) {
                fieldsEmpty.push(keyField);
            }
        }
    }
    return fieldsEmpty;
};