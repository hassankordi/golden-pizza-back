const User = require("../modal/user.modal")
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client('566957944883-4ovoi05bh8g3ktjqju57r7s2fgte1e36.apps.googleusercontent.com')

// node mailer to send verify email
const nodemailer = require('nodemailer')
// to compare password in login
const bcrypt = require("bcrypt");

//**  regestration  **//
const sign_up = async (req, res) => {

    let { name, email, phone, location, password, confirm_password } = req.body

    try {
        // check if this email is exist
        const user = await User.findOne({ email });
        if (user) {
            // is case email is exist
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'this email is already exist' })

        }
        else {
            if (password != confirm_password) {
                // in case confirm password is not match
                res.status(StatusCodes.BAD_REQUEST).json({ message: 'Both password should match' })
            }
            else {
                // hash password using hooks and save in db
                const newUser = new User({ name, email, password, location, phone });
                await newUser.save();
                res.status(StatusCodes.CREATED).json({ message: 'created success', newUser });

                //make a token and send him to user mail to verify his account
                const token = jwt.sign({ email: email }, process.env.SECRET_KEY);

                // information about sender
                const Transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: process.env.GMAIL_USER,
                        pass: process.env.GMAIL_PASS,
                    }
                });

                // make a mail
                let info = await Transporter.sendMail({
                    from: `"golde-pizza" <foo@example.com>`,
                    to: email,
                    subject: 'verify your account',
                    text: 'verify your account here',
                    html: `<div>
                               <p>verify your account here</p>
                               <a href='http://localhost:7000/verifyUser/${token}'>verify
                             </div>`
                });

            }
        }

    }
    catch (error) {
        // catch error 
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'error in regestration', error })


    }
}

//**  login  **//
const sign_in = async (req, res) => {

    let { email, password } = req.body;

    try {
        // check if this email is sign up or no
        let user = await User.findOne({ email })
        if (!user) {

            res.status(StatusCodes.BAD_REQUEST).json({ message: 'email is not found' })
        } else {
            // check if this the password is correct
            const match = await bcrypt.compare(password, user.password)

            if (match) {
                const token = await jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY, { expiresIn: '1d' })
                console.log(process.env.SECRET_KEY);
                res.status(StatusCodes.OK).json({ message: 'login success', user, token })
            }
            else {
                res.status(StatusCodes.BAD_REQUEST).json({ message: 'wrong password' })
            }
        }

    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: 'can not sign in', error })

    }


}

//**  login with google **//
const sign_in_withGoogle = async (req, res) => {

    let { token } = req.body;


    client.verifyIdToken({
        idToken: token,
        audience: '566957944883-4ovoi05bh8g3ktjqju57r7s2fgte1e36.apps.googleusercontent.com'
    }).then(async (result) => {
        console.log(result);
        let decoded = result.payload
        // check if this user is verified or no
        if (decoded.email_verified) {
            const user = await User.findOne({ email: decoded.email })
            // check if this user is regesterd before or this the first time
            if (user) {
                // make a token to send it to front
                // const token = jwt.sign({ email: email }, process.env.SECRET_KEY);
                // console.log(process.env.SECRET_KEY);

                const token = jwt.sign({ email: decoded.email, role: 'user', isVerified: decoded.email_verified }, process.env.SECRET_KEY, { expiresIn: '1h' });
                res.status(StatusCodes.OK).json({ message: 'login success', token })
            }
            // if this is the first time for this user in my site i will save in database
            else {
                // make a token to send it to front
                const token = jwt.sign({ email: decoded.email, role: 'user', isVerified: decoded.email_verified }, process.env.SECRET_KEY, { expiresIn: '1h' });
                // save in database
                const newUser = await User.insertMany({
                    email: decoded.email,
                    name: decoded.name,
                    isVerified: decoded.email_verified,
                    role: 'user',
                    phone: "not here",
                    location: "not here",
                    password: "not here",
                })
                res.status(StatusCodes.CREATED).json({ message: 'created success ', token })


            }





        } else {
            res.status(StatusCodes.BAD_REQUEST).json({ message: 'this email is not verified' })

        }

    }).catch((error) => {
        console.log(error);
        res.status(StatusCodes.BAD_REQUEST).json({ message: error })

    })


}
// validate on token
const verifyUser = async (req, res) => {

    let { token } = req.params;
    // console.log(token); //undefined
    // console.log(req.params); // {}
    console.log('hi before try');

    try {
        const decoded = await jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded);


        const user = await User.findOne({ email: decoded.email })
        console.log(user);
        if (user) {
            const newUser = await User.updateOne({ email: decoded.email }, { isVerified: true })
            res.json({ message: 'updated success', newUser })
        }
        else {
            res.json({ message: 'this acc is not here' })

        }


    } catch (error) {
        res.json({ message: 'errrr verify', error })
    }

}

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
        if (users) {
            res.json({ message: 'all users is here', users })


        } else {
            res.json({ message: 'no users here' })

        }

    } catch (error) {
        res.json({ message: 'error in getting all users', error })

    }
}

const getUserByEmail = async (req, res) => {
    let { email } = req.body;



    try {
        const user = await User.findOne({ email })
        console.log(user);

        if (user) {
            res.json({ message: 'this user is here', user })

        } else {
            res.json({ message: 'this user is not here' })

        }

    } catch (error) {
        res.json({ message: 'error in getting this user', error })

    }
}

const getUserByPhone = async (req, res) => {
    let { phone } = req.body;



    try {
        const user = await User.findOne({ phone })
        console.log(user);

        if (user) {
            res.json({ message: 'this user is here', user })

        } else {
            res.json({ message: 'this user is not here' })

        }

    } catch (error) {
        res.json({ message: 'error in getting this user', error })

    }
}


const blockUserByEmail = async (req, res) => {
    let { email } = req.body;



    try {
        const user = await User.findOne({ email })
        console.log(user);

        if (user) {
            await User.updateOne({ email } ,{blocked:true})

            res.json({ message: 'this user is blocked success', user })

        } else {
            res.json({ message: 'this user is not here' })

        }

    } catch (error) {
        res.json({ message: 'error in block this user', error })

    }
}


const blockUserByPhone = async (req, res) => {
    let { phone } = req.body;

    console.log(phone);



    try {
        const user = await User.findOne({ phone })
        const users = await User.find({ phone })
        console.log(phone);
        console.log(users);
        console.log(user);

        if (user) {
            await User.updateOne({ phone } ,{blocked:true})

            res.json({ message: 'this user is blocked success', user })

        } else {
            res.json({ message: 'this user is not here' })

        }

    } catch (error) {
        res.json({ message: 'error in block this user', error })

    }
}



module.exports = {
    sign_up,
    sign_in,
    verifyUser,
    getAllUsers,
    sign_in_withGoogle,
    getUserByEmail,
    getUserByPhone ,

    blockUserByEmail,
    blockUserByPhone
}












 // console.log(decoded.payload);
    // let client = decoded.payload;
    // res.status(StatusCodes.OK).json({ msg: 'ok ya bro'})
    // try {
    //     // check if this email is sign up or no
    //     let user = await User.findOne({ email:client.email })
    //     if (user) {

    //         res.status(StatusCodes.BAD_REQUEST).json({ msg: 'login' })
    //     } else {
    //         // check if this the password is correct
    //         const match = await bcrypt.compare(password, user.password)

    //         if (match) {
    //             const token = await jwt.sign({ _id: user._id, role: user.role }, process.env.SECRET_KEY)
    //             console.log(process.env.SECRET_KEY);
    //             res.status(StatusCodes.OK).json({ msg: 'this user is here', user, token })
    //         }
    //         else {
    //             res.status(StatusCodes.BAD_REQUEST).json({ msg: 'wrong password' })
    //         }
    //     }

    // } catch (error) {
    //     res.status(StatusCodes.BAD_REQUEST).json({ msg: 'can not sign in', error })

    // }
