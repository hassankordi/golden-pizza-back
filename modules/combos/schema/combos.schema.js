const mongoose = require('mongoose')

const combosSchema = new mongoose.Schema({
    title :{type:String , required:true},
    over_view :{type:String , required:true},
    price :{type:String , required:true},
    img_src :{type:mongoose.Schema.Types.Mixed,default:false},
})


module.exports = combosSchema
