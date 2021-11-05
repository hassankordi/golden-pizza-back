const categoriesSchema = require("../schema/categories.schema")
const mongoose = require("mongoose")

const Categories = mongoose.model('categories' , categoriesSchema)


module.exports = Categories