const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const userServices = require('../services/user')

module.exports = async function (passport) {

    const opts = {}
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
    opts.secretOrKey = process.env.JWTSECRET
    passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {

        let verifiedUser = await userServices.findByEmail(jwt_payload)
        console.log('verifiedUser', verifiedUser)
        if (!verifiedUser) {
            return done(null, false)
        }else{
            return done(null, verifiedUser)
        }
    }))
}