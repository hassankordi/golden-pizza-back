const { getAllCategories , deleteItem } = require('../controllers/categories.controller')

const categoriesRouter = require('express').Router()







categoriesRouter.get('/allCategories' ,getAllCategories )
categoriesRouter.post('/deleteProduct' ,deleteItem )



module.exports =categoriesRouter