export class InternalServerError {
  public readonly message: string;

  public readonly statusCode: number;

  constructor(message?: string) {
    this.message = message || 'Internal server error';
    this.statusCode = 500;
  }
}
