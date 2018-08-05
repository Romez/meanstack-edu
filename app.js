const experss = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require('passport')
const authRoute = require('./routes/auth')
const analyticRoute = require('./routes/analytic')
const categoryRoute = require('./routes/category')
const orderRoute = require('./routes/order')
const positionRoute = require('./routes/position')
const keys = require('./config/keys')
const app = experss()

mongoose.connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {console.log('connected')})
  .catch((err) => console.log(`Mongo connection error: ${err}`))

app.use(passport.initialize())
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use('/uploads', experss.static('uploads'))
app.use(require('cors')())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use('/uploads', experss.static('uploads'))

app.use('/api/auth', authRoute)
app.use('/api/analytic', analyticRoute)
app.use('/api/category', categoryRoute)
app.use('/api/order', orderRoute)
app.use('/api/position', positionRoute)

module.exports = app