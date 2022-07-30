export class AppError {
    message;
    statusCode;
    fields;
    constructor(message, statusCode =400, fields = null) {
        this.message = message;
        this.statusCode = statusCode;
        this.fields = fields;
    }

}