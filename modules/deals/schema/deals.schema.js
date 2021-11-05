const mongoose = require('mongoose')

const dealsSchema = new mongoose.Schema({
  
    over_view :{type:String , required:true},
    price :{type:String , required:true},
  
})


module.exports = dealsSchema
