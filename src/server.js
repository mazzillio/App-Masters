import express from "express";
import cors from "cors";
import { AppError } from "./AppError.js";
import { DonationUseCase } from "./useCases/DonationUseCase.js";


const serverExpress = express();
serverExpress.use(express.json());
serverExpress.use(cors());
serverExpress.get("/", (request, response) => {
    return response.json({ alive: true });
});
serverExpress.post("/donation", (request, response) => {
    const useCasePost = new DonationUseCase();
    try {
        useCasePost.execute(request.body);
        return response.json({sucess:true});
    } catch (error) {
        if(error instanceof AppError) {
            return response.status(error.statusCode)
            .json({
                error: true,
                errorMessage: error.message,
                requiredFields: error.fields
            })
        }
        return response.status(400).json({
            error: true,
            errorMessage: error.message
        });
    }
});
export { serverExpress};


