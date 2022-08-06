import * as yup from "yup";

import { AppError } from "../AppError";
import { IDevice } from "../interfaces/IDevice";
import { IDonationRequest } from "../interfaces/IDonationRequest";
import { IDonationsRepository } from "../repository/donations/IDonatonRepository";
import { IUsersRepotory } from "../repository/users/IUsersRepository";
import { ValidationDevicesTypes } from "./validations/validationDeviceType";
import { ValidationDevicesValues } from "./validations/validationDeviceValue";
import { ValidationFields } from "./validations/validationFields";
import {
  VerifyPhoneNumber,
  VerifyZip,
} from "./validations/vallidationsWithRegex";

export class DonationUseCase {
  constructor(
    private usersRepository: IUsersRepotory,
    private donationsRepository: IDonationsRepository
  ) {}
  private validantionEmail = yup.object().shape({
    email: yup.string().email(),
  });
  async execute(objetoRequest: IDonationRequest): Promise<void> {
    const {
      name,
      email,
      phone,
      zip,
      streetAddress,
      number,
      complement,
      neighborhood,
      city,
      state,
      deviceCount,
      devices,
    } = objetoRequest;
    const fieldsMissing = ValidationFields(objetoRequest);
    if (fieldsMissing.length > 0) {
      const messageError = `Todos os campos obrigatórios devem ser informados:`;
      throw new AppError(messageError, 400, fieldsMissing);
    }
    if (email) {
      const isValidEmail = await this.validantionEmail.isValid({ email });
      if (!isValidEmail) {
        throw new Error("Email inválido");
      }
    }
    if (phone && !VerifyPhoneNumber(phone)) {
      throw new Error("Phone inválido");
    }
    if (zip && !VerifyZip(zip)) {
      throw new Error("Zip inválido");
    }
    if (devices && deviceCount !== devices.length) {
      throw new Error(
        `A quantidade de equipamentos (${deviceCount}) não está de acordo com as informações de equipamentos enviados (${devices.length})`
      );
    }
    const types = ValidationDevicesTypes(devices as IDevice[]);
    if (types.length > 0) {
      const message = types.join(", ");
      throw new Error(`types dos equipamentos ${message} estão incorretos`);
    }
    const values = ValidationDevicesValues(devices as IDevice[]);
    if (values.length > 0) {
      const message = values.join(", ");
      throw new Error(
        `Valor(es) do(s) equipamento(s) ${message} estão incorretos`
      );
    }
    try {
      await this.usersRepository.saveUser({
        name: name as string,
        email,
        phone: phone as string,
      });
      const findUser = await this.usersRepository.findUser(phone as string);
      await this.donationsRepository.saveDonation({
        userId: findUser.id,
        zip: zip as string,
        streetAddress: streetAddress as string,
        number: number as string,
        complement: complement as string,
        neighborhood: neighborhood as string,
        city: city as string,
        state: state as string,
        deviceCount: deviceCount as number,
        devices: devices as IDevice[],
      });
    } catch (error) {
      throw new Error(error as string);
    }
  }
}
