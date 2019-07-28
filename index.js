const express = require('express')
const server = express();
const postsRouter = require('./routes/posts/index');
const commentsRouter = require('./routes/comments/index')


server.use(express.json());

server.get('/', (req, res) => {
    res.send('YOOO');
})

server.use(postsRouter);
server.use(commentsRouter);

const port = 3000;

server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`));