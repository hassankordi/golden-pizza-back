const combosSchema = require("../schema/combos.schema")
const mongoose = require("mongoose")

const Combos = mongoose.model('combos' , combosSchema)


module.exports = Combos