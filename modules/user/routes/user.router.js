const userRoutes = require('express').Router()

const { sign_up , verifyUser ,getAllUsers ,sign_in ,sign_in_withGoogle,getUserByEmail, getUserByPhone, blockUserByEmail, blockUserByPhone } = require("../controllers/user.controller");
const validationRequest = require('../../../common/middleware/validationRequest')
const isAuthirized = require('../../../common/middleware/isAuthorized')
const { signUpSchema , verifySchema ,signInSchema} = require("../validation/user.validation")

const {GET_ALL_USERS} = require("../userEndpoints")

userRoutes.post('/sign_up',validationRequest(signUpSchema),sign_up)

userRoutes.post('/sign_in',validationRequest(signInSchema),sign_in)
userRoutes.post('/sign_in/google',sign_in_withGoogle)


userRoutes.get('/verifyUser/:token',validationRequest(verifySchema) ,verifyUser)

userRoutes.get('/users',isAuthirized(GET_ALL_USERS),getAllUsers)
// post because i will take a data from the front (i can do it with params but i prefere body)
userRoutes.post('/users/byEmail',isAuthirized(GET_ALL_USERS),getUserByEmail)
userRoutes.post('/users/byPhone',isAuthirized(GET_ALL_USERS),getUserByPhone)


///***   to block any user */

userRoutes.patch('/users/blockByEmail',isAuthirized(GET_ALL_USERS),blockUserByEmail)
userRoutes.patch('/users/blockByPhone',isAuthirized(GET_ALL_USERS),blockUserByPhone)





module.exports=userRoutes