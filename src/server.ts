import cors from "cors";
import express, { Request, Response } from "express";

import { AppError } from "./AppError";
import { DonationsPostgresRepository } from "./repository/donations/DonationPostgresRepository";
import { UsersPostgresRepository } from "./repository/users/UsersPostgresRepository";
import { DonationUseCase } from "./useCases/DonationUseCase";

const serverExpress = express();
serverExpress.use(express.json());
serverExpress.use(cors());
serverExpress.get("/", (request: Request, response: Response) => {
  return response.json({ alive: true });
});
serverExpress.post(
  "/donation",
  async (request: Request, response: Response) => {
    const usersRepository = new UsersPostgresRepository();
    const donationsRepository = new DonationsPostgresRepository();
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
export { serverExpress };
