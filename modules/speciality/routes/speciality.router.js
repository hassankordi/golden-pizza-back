const specialityRouter = require('express').Router()

 const { addToSpecialitySec , getSpecialitySec } = require('../controllers/speciality.controller')


// validation schema
const { addSpecialitySecSchema } = require('../validations/specialityValidations')


const validationRequest = require('../../../common/middleware/validationRequest')
const isAuthorized = require('../../../common/middleware/isAuthorized')

const {ADD_TO_SPECIALITY_SEC} = require('../speciality.endpoint')


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



specialityRouter.post(
  '/addToSpecialitySec',
uploads.single('img_src'),
validationRequest(addSpecialitySecSchema),
isAuthorized(ADD_TO_SPECIALITY_SEC),
addToSpecialitySec )



specialityRouter.get('/specialitySec', getSpecialitySec )
// isAuthorized(ADD_TO_PIZZA_SEC),

module.exports =specialityRouter