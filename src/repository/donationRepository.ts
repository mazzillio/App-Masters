import { randomUUID } from "crypto";

import { Device } from "../interfaces/Device";
import { IDonation } from "../interfaces/IDonation";
import { prisma } from "../prisma";

export class DonationsRepository {
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
  async listAllDonations() {
    const allDonations = await prisma.donations.findMany({
      include: {
        user: {
          select: {
            id: false,
            name: true,
            email: true,
            phone: true,
          },
        },
        Devices: true,
      },
    });
    return allDonations;
  }
}
