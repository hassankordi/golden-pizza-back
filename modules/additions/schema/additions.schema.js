const mongoose = require('mongoose')

const additionsSchema = new mongoose.Schema({
    title :{type:String , required:true},
    over_view :{type:String , required:true},
    smallPrice :{type:String , required:true},
    mediumPrice :{type:String , required:true},
    largePrice :{type:String , required:true},
    img_src :{type:mongoose.Schema.Types.Mixed,default:false},
})


module.exports = additionsSchema
