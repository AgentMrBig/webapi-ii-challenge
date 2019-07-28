const postsRouter = require('express').Router({ mergeParams: true })
const Posts = require('../../data/db');

// Get posts
postsRouter.get('/api/posts', async (req, res) => {
    await Posts.find()
        .then(posts => {
            res.status(200).json({ success: true, posts });
        })
        .catch(() => {
            res.status(500).json({
                success: false, errorMessage: 'The posts information could not be retrieved.',
            });
        });
});

// Get posts by id
postsRouter.get('/api/posts/:id', async (req, res) => {
    await Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json({ success: true, post });
            } else {
                res
                    .status(404)
                    .json({ success: false, message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(() => {
            res
                .status(500)
                .json({ success: false, errorMessage: 'The post information could not be retrieved.' });
        });
});

// Post(insert) new post
postsRouter.post('/api/posts', async (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res
            .status(400)
            .json({ success: false, errorMessage: 'Please provide title and contents for the post.' });
    } else {
        await Posts.insert(req.body)
            .then(post => {
                res.status(201).json({ success: true, post });
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                    errorMessage:
                        'There was an error while saving the post to the database',
                });
            });
    }

});

// Put(update) post by id
postsRouter.put('/api/posts/:id', async (req, res) => {
    const { title, contents } = req.body;

    if (!title || !contents) {
        res
            .status(400)
            .json({ success: false, errorMessage: 'Please provide title and contents for the post.' });
    } else {
        await Posts.update(req.params.id, { title, contents })
            .then(post => {
                if (post) {
                    res.status(200).json({ success: true, post: { postTitle: title, postContents: contents } });
                } else {
                    res
                        .status(404)
                        .json({
                            success: false,
                            message: 'The post with the specified ID does not exist.',
                        });
                }
            })
            .catch(() => {
                res.status(500).json({
                    success: false,
                    errorMessage: 'The post information could not be modified.',
                });
            });
    }
});

postsRouter.delete('/api/posts/:id', async (req, res) => {
    await Posts.remove(req.params.id)
        .then(count => {
            if (count && count > 0) {
                res.status(200).json({
                    success: true,
                    message: `You have deleted post with id: ${req.params.id}`
                });
            } else {
                res
                    .status(404)
                    .json({ success: false, message: 'The post with the specified ID does not exist.' });
            }
        })
        .catch(() => {
            res.status(500).json({ success: false, errorMessage: 'The post could not be removed' });
        });
});


module.exports = postsRouter;