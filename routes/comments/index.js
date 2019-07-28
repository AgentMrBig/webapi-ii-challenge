const commentsRouter = require('express').Router({ mergeParams: true })
const Posts = require('../../data/db');

// Get comments for a post by id
commentsRouter.get('/api/posts/:id/comments', (req, res) => {
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
commentsRouter.post('/api/posts/:id/comments', (req, res) => {
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
                    .json({ errorMessage: `There was an error while saving the comment to the database. ${res.status}` });
            });
    }

});

module.exports = commentsRouter;