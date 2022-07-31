import express from "express";
import { AppError } from "./AppError.js";
import { DonationUseCase } from "./useCases/DonationUseCase.js";


const serverExpress = express();
const cors = (request, response, next) => { 
    response.header("Access-Control-Allow-Origin", "*"); 
    response.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
};
serverExpress.use(express.json());
serverExpress.use(cors);
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


