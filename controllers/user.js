const { userValidation, loginValidation } = require('../utils/index')
const userService = require('../services/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

// REGISTER
exports.register = async (req, res) => {
    try {
        const validationError = userValidation(req.body)
        if (validationError.error) return res.status(400).json(validationError.error.details[0].message)

        const hash = bcrypt.hashSync(req.body.password, 10);
        req.body.password = hash

        const savedData = await userService.save(req.body)
        if (savedData) res.status(200).json(savedData)
    } catch (error) {
        res.status(400).json(error)
    }
}

// LOGIN
exports.login = async (req, res) => {
    try {
        const validationError = loginValidation(req.body)
        if (validationError.error) return res.status(400).json(validationError.error.details[0].message)

        const loginData = await userService.findByEmail(req.body);
        if (!loginData) {
            return res.status(400).send('Data not found')
        }
        const check = await bcrypt.compare(req.body.password, loginData.password)

        const encodedData = {email: loginData.email}
        const jwtToken = await jwt.sign(encodedData, process.env.JWTSECRET, {expiresIn: '24h'})
        
        if (check == true)
        {
            res.status(200).send({message:'login successful', token: jwtToken})
        }else{
            res.status(400).send('Data not found')
        }
    } catch (error) {
        res.status(400).json(error)
    }
}