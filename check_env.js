const env = require('./src/config/env');
console.log('env.JWT_SECRET=' + JSON.stringify(env.JWT_SECRET));
console.log('process.env.JWT_SECRET=' + JSON.stringify(process.env.JWT_SECRET));
