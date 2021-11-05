const pizzaSchema = require("../schema/pizza.schema")
const mongoose = require("mongoose")

const Pizza = mongoose.model('pizza' , pizzaSchema)


module.exports = Pizza