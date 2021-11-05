
const mongoose = require('mongoose')

const categoriesSchema = new mongoose.Schema({
    deals :{type:mongoose.Schema.Types.ObjectId , ref:'deals'},
    pizza :{type:mongoose.Schema.Types.ObjectId , ref:'pizza'},
    specialty :{type:mongoose.Schema.Types.ObjectId , ref:'speciality'},
    combos :{type:mongoose.Schema.Types.ObjectId , ref:'combos'},
    additions :{type:mongoose.Schema.Types.ObjectId , ref:'additions'},
})


module.exports = categoriesSchema
