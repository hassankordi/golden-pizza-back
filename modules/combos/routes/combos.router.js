const { addToCombosSec , getCombosSec } = require('../controllers/combos.controller')
const { addCombosSecSchema } = require('../validations/combosValidation')

const combosRouter = require('express').Router()

const validationRequest = require('../../../common/middleware/validationRequest')
const isAuthorized = require('../../../common/middleware/isAuthorized')

const {ADD_TO_COMBOS_SEC} = require('../combos.endpoint')


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

combosRouter.post('/addToCombosSec',uploads.single('img_src'),validationRequest(addCombosSecSchema),isAuthorized(ADD_TO_COMBOS_SEC),addToCombosSec )
combosRouter.get('/combosSec',getCombosSec  )
// isAuthorized(ADD_TO_PIZZA_SEC),

module.exports =combosRouter