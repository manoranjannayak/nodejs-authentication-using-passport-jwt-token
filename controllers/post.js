const { postValidation } = require('../utils/index')
const postService = require('../services/post')

// CREATE POST 
exports.createPost = async (req, res) => {
    try {
        const validationError = postValidation(req.body)
        if (validationError.error) return res.status(400).send(validationError.error.details[0].message)
        
        let savedData = await postService.save(req.body)
        if (savedData) res.status(400).send(savedData)
    } catch (error) {
        res.status(400).send(error)
    }
}

// GET ALL POSTS
exports.allPost = async (req, res) => {
    try {
        let foundData = await postService.find()
        if (foundData) res.status(400).send(foundData)
    } catch (error) {
        res.status(400).send(error)
    }
}

// UPDATE POST
exports.updatePost = async (req, res) => {
    try {
        let id = req.params.id

        let updatedData = await postService.update(id,req.body)
        if (updatedData) res.status(400).send({message:'Data updated', data: updatedData})
    } catch (error) {
        res.status(400).send(error)
    }
}

// DELETE POST
exports.deletePost = async (req, res) => {
    try {
        let id = req.params.id
        let deletedData = await postService.delete(id)
        if (deletedData) res.status(400).send({message:'Data deleted'})
    } catch (error) {
        res.status(400).send(error)
    }
}

// FIND BY LATITUDE AND LONGITUDE
exports.findByLocation = async (req, res) => {
    try {
        let foundData = await postService.findByLocation(req.body)
        if (!foundData) res.status(400).send('Data not found')

        if (foundData) res.status(400).send(foundData)
    } catch (error) {
        res.status(400).send(error)
    }
}

// POST COUNT
exports.postCount = async (req, res) => {
    try {
        let activeData = await postService.activeCount()
        let inactiveData = await postService.inactiveCount()

        res.status(400).send({ActivePosts: activeData.length,InactivePosts: inactiveData.length})
    } catch (error) {
        res.status(400).send(error)
    }
}
