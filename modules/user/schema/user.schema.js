const  mongoose  = require("mongoose");
const  bcrypt  = require("bcrypt");
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')

const userSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true},
    location:{type:String , required:true},
    password:{type:String , required:true},
    phone:{type:String ,required:true },
    isVerified:{type:Boolean , default:'false'},
    role:{type:String , default:'user'},
    blocked:{type:Boolean , default:'false'},
    // orders :{type:mongoose.Schema.Types.ObjectId , ref:'orders'}
},{
    timestamps:true
})

userSchema.pre('save' ,async function(next){
    // hash the password and set the new value (hash) in password
    this.password = await bcrypt.hash(this.password ,8) 
    next();
})

// userSchema.post('save' ,async function(next){
//     //make a token and send him to user mail to verify his account
//     const token = jwt.sign({email:this.email ,role:this.role} , process.env.SECRET_KEY)
//     // information about sender
//     console.log(token);
//    const Transporter =  nodemailer.createTransport({
//        service:'gmail' , 
//        auth:{
//            user:process.env.GMAIL_USER ,
//            pass:process.env.GMAIL_PASS ,
//        }
//    })
//     // make a mail
//     console.log(Transporter);

//    let info = await Transporter.sendMail({
//        from:`"golde-pizza" <foo@example.com>` ,
//        to:this.email ,
//        subject:'verify your account' ,
//        text:'verify your account here' ,
//        html:`<div>
//        <p>verify your account here</p>
//        <a href='http://localhost:7000/verifyUser/${token}'>verify
//        </div>`
//    })
//    console.log(info);

//     next();
// })
module.exports = userSchema;