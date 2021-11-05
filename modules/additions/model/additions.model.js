const additionsSchema = require("../schema/additions.schema")
const mongoose = require("mongoose")

const Additions = mongoose.model('additions' , additionsSchema)


module.exports = Additions