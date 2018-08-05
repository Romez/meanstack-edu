const Category = require('../models/Category')
const Position = require('../models/Position')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async (req, res) => {
  try {
    const categories = await Category.find({user: req.user.id})
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async (req, res) => {
  try {
    await Promise.all([
      Category.remove({_id: req.params.id}),
      Position.remove({category: req.params.id})
    ])

    res.status(200).json({message: 'Категория удалена'})
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      user: req.user.id,
      imageSrc: req.file ? req.file.filename : ''
    })

    await category.save()

    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = async (req, res) => {
  const update = {
    name: req.body.name
  }

  if (req.file) {
    update.imageSrc = req.file.filename
  }

  try {
    const category = await Category.findOneAndUpdate({
      _id: req.params.id
    }, {
      $set: update
    }, {
      new: true
    })

    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}