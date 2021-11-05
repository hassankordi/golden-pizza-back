const {addToAdditionsSec ,getAdditionsSec  } = require('../controllers/additions.controller')
const {  addAdditionsSecSchema} = require('../validations/additionsValidations')

const additionsRouter = require('express').Router()

const validationRequest = require('../../../common/middleware/validationRequest')
const isAuthorized = require('../../../common/middleware/isAuthorized')

const {ADD_TO_ADDITIONS_SEC} = require('../additions.endpoint')


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

additionsRouter.post('/addToAdditionsSec',uploads.single('img_src'),validationRequest(addAdditionsSecSchema),isAuthorized(ADD_TO_ADDITIONS_SEC),addToAdditionsSec )
additionsRouter.get('/additionsSec', getAdditionsSec )
// isAuthorized(ADD_TO_PIZZA_SEC),

module.exports =additionsRouter