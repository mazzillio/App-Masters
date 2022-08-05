export class AppError {
  public readonly message: string;
  public readonly statusCode: number;
  public readonly fields: string[];
  constructor(message: string, statusCode = 400, fields: string[] = []) {
    this.message = message;
    this.statusCode = statusCode;
    this.fields = fields;
  }
}
