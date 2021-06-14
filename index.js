const expres = require('express')
const app = expres()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
dotenv.config()

app.use(bodyParser.json({limit: '50mb'}))
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

const passport = require('passport');
require('./authentication/passport')(passport)
app.use(passport.initialize())

const Routes = require('./routes/index')
app.use('/', Routes)

const PORT = process.env.PORT
const MONGOURI = process.env.MONGOURI

// Database connection
mongoose
    .connect(MONGOURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => {
        console.log('Connected to Database')
        app.listen(PORT, () => {
            console.log('Server listening at', PORT)
        })
    })
    .catch((err) => {
        console.log('Connection not established with the database', err)
    })
