export function VerifyEmail(email) {
    const regexEmail = /\S+@\S+\.\S+/;
    return regexEmail.test(email);
}