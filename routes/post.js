const router = require('express').Router()
const postController = require('../controllers/post')

router.post('/', postController.createPost)
router.get('/', postController.allPost)
router.post('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)
router.get('/findByLocation', postController.findByLocation)
router.get('/postCount', postController.postCount)

module.exports = router
