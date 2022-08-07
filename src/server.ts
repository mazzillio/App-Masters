import cors from "cors";
import express, { Request, Response } from "express";

import { AppError } from "./AppError";
import { DonationsPostgresRepository } from "./repository/donations/DonationPostgresRepository";
import { UsersPostgresRepository } from "./repository/users/UsersPostgresRepository";
import { DonationUseCase } from "./useCases/DonationUseCase";
import { GetAllDonationsUseCase } from "./useCases/GetAllDonationsUseCase";

const serverExpress = express();
serverExpress.use(express.json());
serverExpress.use(cors());
const usersRepository = new UsersPostgresRepository();
const donationsRepository = new DonationsPostgresRepository();
serverExpress.get("/", (request: Request, response: Response) => {
  return response.json({ alive: true });
});
serverExpress.post(
  "/donation",
  async (request: Request, response: Response) => {
    const useCasePost = new DonationUseCase(
      usersRepository,
      donationsRepository
    );
    try {
      await useCasePost.execute(request.body);
      return response.json({ sucess: true });
    } catch (error) {
      if (error instanceof AppError) {
        return response.status(error.statusCode).json({
          error: true,
          errorMessage: error.message,
          requiredFields: error.fields,
        });
      }
      const err = error as any;
      return response.status(400).json({
        error: true,
        errorMessage: err.message,
      });
    }
  }
);
serverExpress.get("/donation", async (req: Request, res: Response) => {
  const listDonations = new GetAllDonationsUseCase(donationsRepository);
  try {
    const donations = await listDonations.execute();
    return res.json(donations);
  } catch (error) {
    const err = error as any;
    return res.status(400).json({
      error: true,
      errorMessage: err.message,
    });
  }
});
export { serverExpress };
