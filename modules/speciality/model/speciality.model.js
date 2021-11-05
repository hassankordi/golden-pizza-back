const specialitySchema = require("../schema/speciality.schema")
const mongoose = require("mongoose")

const Speciality = mongoose.model('speciality' , specialitySchema)


module.exports = Speciality