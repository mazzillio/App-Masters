import cors from "cors";
import express, { Request, Response } from "express";

import { AppError } from "./AppError";
import { DonationUseCase } from "./useCases/DonationUseCase";

const serverExpress = express();
serverExpress.use(express.json());
serverExpress.use(cors());
serverExpress.get("/", (request: Request, response: Response) => {
  return response.json({ alive: true });
});
serverExpress.post("/donation", (request: Request, response: Response) => {
  const useCasePost = new DonationUseCase();
  try {
    useCasePost.execute(request.body);
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
});
export { serverExpress };
