const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')


module.exports.login = async (req, res) => {
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
    if (passwordResult) {
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Пароль не верный'
      })
    }
  } else {
    res.status(404).json({
      message: 'Пользоваетль не найден'
    })
  }
}

module.exports.register = async (req, res) => {
  const {email} = req.body
  const candidate = await User.findOne({email})

  if (candidate) {
    res.status(409).json({message: 'Такой email уже занят'})
  } else {
    const salt = bcrypt.genSaltSync(10)
    const password = bcrypt.hashSync(req.body.password, salt)

    const user = new User({
      email,
      password
    })

    try {
      user.save()
      res.status(201).json(user)
    } catch (e) {
      console.error(e)
    }

  }
}