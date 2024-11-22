class HttpException extends Error {
  constructor(message, statusCode) {
    super(message);
    
    this.statusCode = statusCode;
  }

  get body() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      details: this.details,
    };
  }
}

module.exports = HttpException;
