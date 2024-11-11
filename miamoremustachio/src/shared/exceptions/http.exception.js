class HttpException extends Error {
  constructor(message, statusCode) {
    super(message);
    
    this.statusCode = statusCode;
  }

  get response() {
    return {
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

module.exports = HttpException;
