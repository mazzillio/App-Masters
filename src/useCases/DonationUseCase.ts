import { AppError } from "../AppError";
import { IDonationRequest } from "../interfaces/IDonationRequest";
import { ValidationDevicesTypes } from "./validations/validationDeviceType";
import { ValidationDevicesValues } from "./validations/validationDeviceValue";
import { ValidationFields } from "./validations/validationFields";
import {
  VerifyEmail,
  VerifyPhoneNumber,
  VerifyZip,
} from "./validations/vallidationsWithRegex";
import { VerifyFieldsEmpty } from "./validations/verifyFieldsEmpty";

export class DonationUseCase {
  execute(objetoRequest: IDonationRequest) {
    const { email, zip, phone, deviceCount, devices } = objetoRequest;
    const fieldsMissing = ValidationFields(objetoRequest);
    if (fieldsMissing.length > 0) {
      const messageError = `Todos os campos obrigatórios devem ser informados:`;
      throw new AppError(messageError, 400, fieldsMissing);
    }
    const fieldsEmpty = VerifyFieldsEmpty(objetoRequest);
    if (fieldsEmpty.length > 0) {
      throw new Error(
        `Os campos ${fieldsEmpty.join(", ")} não podem ser vazios`
      );
    }
    if (email && !VerifyEmail(email)) {
      throw new Error("Email inválido");
    }
    if (phone && !VerifyPhoneNumber(phone)) {
      throw new Error("Phone inválido");
    }
    if (zip && !VerifyZip(zip)) {
      throw new Error("Zip inválido");
    }
    if (deviceCount !== devices.length) {
      throw new Error(
        `A quantidade de equipamentos (${deviceCount}) não está de acordo com as informações de equipamentos enviados (${devices.length})`
      );
    }
    const types = ValidationDevicesTypes(devices);
    if (types.length > 0) {
      const message = types.join(", ");
      throw new Error(`types dos equipamentos ${message} estão incorretos`);
    }
    const values = ValidationDevicesValues(devices);
    if (values.length > 0) {
      const message = values.join(", ");
      throw new Error(
        `Valor(es) do(s) equipamento(s) ${message} estão incorretos`
      );
    }
  }
}
