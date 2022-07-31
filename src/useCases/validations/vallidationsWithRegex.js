function VerifyEmail(email) {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(email);
}
function VerifyPhoneNumber(number) {
    // const regexPhone = /(^\d{10,11}$)|(\(^\d{2}$)\s^\d{9}$)/;
    const regexPhone = /(^\d{10,11}$)|(^\(?\d{2,3}\)?\d{8,9}$)|(^\(?\d{2,3}\)?\d{4,5}-\d{4}$)/;
    const testNumber=String(number).split(" ").join(""); 
    return regexPhone.test(testNumber);   
}
function VerifyZip(zip) {
    const regexZip = /(^\d{5}$)|(^\d{8}$)|(^\d{5}-\d{3}$)/;
    return regexZip.test(zip);
}

export { VerifyEmail, VerifyZip, VerifyPhoneNumber };