import { serverExpress } from "./server.js";

const PORT = 3242;
serverExpress.listen(PORT, 
    () => console.info(`Servidor rodando na porta: ${PORT}`)
);
