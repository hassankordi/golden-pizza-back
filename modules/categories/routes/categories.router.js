const { getAllCategories , deleteItem, updateItem } = require('../controllers/categories.controller')

const categoriesRouter = require('express').Router();
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

const isAuthorized = require('../../../common/middleware/isAuthorized')
const { ADMIN_ACCESS_CATEGORIES } = require('../categories.endpoint')
// const isAuthorized = require('../../../common/middleware/isAuthorized')




categoriesRouter.get('/allCategories',isAuthorized(ADMIN_ACCESS_CATEGORIES) ,getAllCategories )
categoriesRouter.post('/deleteProduct',isAuthorized(ADMIN_ACCESS_CATEGORIES) ,deleteItem )

//image here 
categoriesRouter.post('/updateProduct' ,uploads.single('img_src'),isAuthorized(ADMIN_ACCESS_CATEGORIES) , updateItem )





module.exports =categoriesRouter