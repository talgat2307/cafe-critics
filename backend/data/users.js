const bcrypt = require('bcrypt');

const users = [
  {
    name: 'Admin',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('001', 10),
    role: 'admin',
  },
  {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: bcrypt.hashSync('001', 10),
  },
  {
    name: 'Bill',
    email: 'bill@gmail.com',
    password: bcrypt.hashSync('001', 10),
  },
  {
    name: 'Bob',
    email: 'bob@gmail.com',
    password: bcrypt.hashSync('001', 10),
  },
  {
    name: 'Alex',
    email: 'alex@gmail.com',
    password: bcrypt.hashSync('001', 10)
  },

];

module.exports = users;