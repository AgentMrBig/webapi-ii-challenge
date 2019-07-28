const commentsRouter = require('express').Router({ mergeParams: true })
const Posts = require('../../data/db');

// Get comments for a post by id
commentsRouter.get('/api/posts/:id/comments', async (req, res) => {
    await Posts.findPostComments(req.params.id)
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
                .json({ success: false, errorMessage: 'The comments information could not be retrieved.' });
        });
});

// Post(insert) new comment to post
commentsRouter.post('/api/posts/:id/comments', async (req, res) => {
    const post_id = req.params.id;
    const { text } = req.body;

    if (!text) {
        res
            .status(400)
            .json({ success: false, errorMessage: 'Please provide text for the comment.' })
    } else {
        await Posts.insertComment({ text, post_id })
            .then(comment => {
                if (comment) {
                    res.status(200).json({ success: true, comment });
                } else {
                    res
                        .status(404)
                        .json({ success: false, message: 'The post with the specified ID does not exist.' });
                }
            })
            .catch((error) => {
                res
                    .status(500)
                    .json({ success: false, errorMessage: `There was an error while saving the comment to the database. post id: ${req.params.id} comment text: ${req.body.text} error: ${error}` });
            });
    }

});

module.exports = commentsRouter;