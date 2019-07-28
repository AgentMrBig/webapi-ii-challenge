const express = require('express')

const Posts = require('./data/db');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('YOOO');
})

// Get posts
server.get('/api/posts', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(() => {
            res.status(500).json({
                errorMessage: 'The posts information could not be retrieved.',
            });
        });
});

// Get posts by id
server.get('/api/posts/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res
                    .status(404)
                    .json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(() => {
            res
                .status(500)
                .json({ errorMessage: 'The post information could not be retrieved.' });
        });
});

// Get comments for a post by id
server.get('/api/posts/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res
                    .status(404)
                    .json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(() => {
            res
                .status(500)
                .json({ errorMessage: 'The comments information could not be retrieved.' });
        });
});

// Post(insert) new comment to post
server.post('/api/posts/:id/comments', (req, res) => {
    const { text } = req.body;

    if (!text) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide text for the comment.' })
    } else {
        Posts.insertComment(req.params.id)
            .then(post => {
                if (post) {
                    res.status(200).json(post);
                } else {
                    res
                        .status(404)
                        .json({ message: 'The post with the specified ID does not exist.' });
                }
            })
            .catch(() => {
                res
                    .status(500)
                    .json({ errorMessage: 'There was an error while saving the comment to the database.' });
            });
    }

});

// Post(insert) new post
server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide title and contents for the post.' });
    } else {
        Posts.insert(req.body)
            .then(post => {
                res.status(201).json(post);
            })
            .catch(() => {
                res.status(500).json({
                    errorMessage:
                        'There was an error while saving the post to the database',
                });
            });
    }

});

// Put(update) post by id
server.put('/api/users/:id', (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res
            .status(400)
            .json({ errorMessage: 'Please provide title and contents for the post.' });
    } else {
        Posts.update(req.params.id, req.body)
            .then(post => {
                if (post) {
                    res.status(200).json(post);
                } else {
                    res
                        .status(404)
                        .json({
                            message: 'The post with the specified ID does not exist.',
                        });
                }
            })
            .catch(() => {
                res.status(500).json({
                    errorMessage: 'The post information could not be modified.',
                });
            });
    }
});

server.delete('/api/posts/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(count => {
            if (count && count > 0) {
                res.status(200).json({
                    message: 'Cold, you deleted that person!.',
                });
            } else {
                res
                    .status(404)
                    .json({ message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: 'The post could not be removed' });
        });
});

const port = 3000;

server.listen(port, () => console.log(`\n*** API on port ${port} ***\n`));