const express = require('express')

const Users = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('YOOO');
})

const port = 3000;

server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`));