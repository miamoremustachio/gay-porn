module.exports.SERVER_URL = 'https://api.genderize.io';
module.exports.HOST = process.env.HOST || 'localhost'
module.exports.PORT = process.env.PORT || 3000;
module.exports.FAVICON = '/favicon.ico';

module.exports.WELCOME_MESSAGE = `That's a Genderize app.
To check the possible gender of your name, send a POST request to this URL:
"${this.HOST}:${this.PORT}/<write_your_name_here>"`;

module.exports.ERROR = {
  REQUEST_CLIENT_ERROR: 'Request error: Client side.',
  REQUEST_SERVER_ERROR: 'Request error: Server side.',
  NAME_NOT_FOUND: 'There is no such name in the database :(',
};