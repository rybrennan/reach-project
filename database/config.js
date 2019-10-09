require('dotenv').config();

// if (process.env.NODE_ENV) {
//   module.exports = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     port: process.env.DB_PORT,
//     database: process.env.DB_NAME
//   };
// } else {
//   module.exports = {
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     password: process.env.DB_PASS,
//     database: 'revService'
//   };
// };

module.exports = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'board'
};

