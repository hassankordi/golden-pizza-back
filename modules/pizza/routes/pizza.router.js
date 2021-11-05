const { addToPizzaSec , getPizzaSec } = require('../controllers/pizza.controller')
const { addPizzaSecSchema } = require('../validations/pizzaValidations')

const pizzaRouter = require('express').Router()

const validationRequest = require('../../../common/middleware/validationRequest')
const isAuthorized = require('../../../common/middleware/isAuthorized')

const {ADD_TO_PIZZA_SEC} = require('../pizza.endpoint')


const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads')
      },
      filename: function (req, file, cb) {
      
        cb(null,new Date().toISOString().replace(/:/g,'-')+file.originalname)
      }
})
const uploads = multer({storage})

// validationRequest(addPizzaSecSchema)

pizzaRouter.post('/addToPizzaSec',uploads.single('img_src'),isAuthorized(ADD_TO_PIZZA_SEC),addToPizzaSec )
pizzaRouter.get('/pizzaSec', getPizzaSec )
// isAuthorized(ADD_TO_PIZZA_SEC),

module.exports =pizzaRouter