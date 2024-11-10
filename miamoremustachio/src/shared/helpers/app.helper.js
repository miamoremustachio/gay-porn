const isDevelopment = app => app.get('env') === 'development';

module.exports = { isDevelopment };
