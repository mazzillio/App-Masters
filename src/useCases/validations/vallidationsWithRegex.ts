function VerifyEmail(email: string): boolean {
  const regexEmail = /\S+@\S+\.\S+/;
  return regexEmail.test(email);
}
function VerifyPhoneNumber(number: string): boolean {
  const regexPhone =
    /(^\d{10,11}$)|(^\(?\d{2,3}\)?\d{8,9}$)|(^\(?\d{2,3}\)?\d{4,5}-\d{4}$)/;
  const testNumber = String(number).split(" ").join("");
  return regexPhone.test(testNumber);
}
function VerifyZip(zip: string): boolean {
  const regexZip = /(^\d{5}$)|(^\d{8}$)|(^\d{5}-\d{3}$)/;
  return regexZip.test(zip);
}

export { VerifyEmail, VerifyZip, VerifyPhoneNumber };
