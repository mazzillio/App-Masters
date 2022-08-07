import { randomUUID } from "crypto";

import { Device } from "../../interfaces/Device";
import { IDonation } from "../../interfaces/IDonation";
import { prisma } from "../../prisma";
import { IDonationsRepository } from "./IDonatonRepository";

export class DonationsPostgresRepository implements IDonationsRepository {
  async saveDonation(donationRequest: IDonation): Promise<void> {
    const devices = donationRequest.devices?.map((device) => {
      Object.assign(device, {
        id: randomUUID(),
      });
      return device;
    });
    await prisma.donations.create({
      include: {
        user: true,
      },
      data: {
        id: randomUUID(),
        zip: donationRequest.zip,
        streetAdress: donationRequest.streetAddress,
        number: donationRequest.number,
        neightborhood: donationRequest.neighborhood,
        complement: donationRequest.complement,
        city: donationRequest.city,
        state: donationRequest.state,
        userId: donationRequest.userId,
        deviceCount: donationRequest.deviceCount,
        Devices: {
          createMany: {
            data: devices as Device[],
          },
        },
      },
    });
  }
  async listDonations(): Promise<any[]> {
    const allDonations = await prisma.donations.findMany({
      // selecionando os campos que eu quero que sejam devolvidos na busca
      select: {
        id: true,
        userId: false,
        zip: true,
        city: true,
        state: true,
        streetAdress: true,
        number: true,
        complement: true,
        neightborhood: true,
        deviceCount: true,
        createdAt: true,
        user: {
          select: {
            id: false,
            name: true,
            email: true,
            phone: true,
          },
        },
        Devices: {
          select: {
            id: false,
            donationId: false,
            type: true,
            condition: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return allDonations;
  }
}
