const router = require('express').Router()
const postRoutes = require('./post')
const userRoutes = require('./user')
const passport = require('passport')

router.use('/post', passport.authenticate('jwt', { session: false }), postRoutes)
router.use('/user', userRoutes)

module.exports = router
