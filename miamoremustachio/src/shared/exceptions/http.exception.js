class HttpException extends Error {
  constructor(message, statusCode) {
    super(message);
    
    this.statusCode = statusCode;
  }

  get body() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

module.exports = HttpException;
