const dealsSchema = require("../schema/deals.schema")
const mongoose = require("mongoose")

const Deals = mongoose.model('deals' , dealsSchema)


module.exports = Deals