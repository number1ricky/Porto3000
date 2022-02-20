const express = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { JWT_SECRET = "notsosecret" } = process.env;
const { getUserById } = require("./db")

const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

const cors = require('cors');
server.use(cors());

server.use(express.json());

const path = require('path');
server.use(express.static(path.join(__dirname, 'build')));

server.use(async (req, res, next) => {
  try {
    const auth = req.header('Authorization'); 
    if(!auth) {
      next();
    } else {
      let [, token] = auth.split(' ');
      token = token.trim();

      const userObj = jwt.verify(token, JWT_SECRET);
      req.user = await getUserById(userObj.id);

      next();
    }
  } catch (error) {
    next(error)
  }
})

server.use('/api', require('./routes'));

server.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
});

const client = require('./db/client');

const PORT = process.env.PORT || 4000;
server.listen(PORT, async () => {
  console.log(`Server is running on ${ PORT }!`);
  try {
    await client.connect();
    console.log('Database is open for business!');
  } catch (error) {
    console.error("Database is closed for repairs!", error);
  }
});
