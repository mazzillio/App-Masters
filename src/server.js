import express from "express";


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
export { serverExpress};