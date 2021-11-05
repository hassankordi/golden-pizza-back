const { getDealsSec, addToDealsSec } = require('../controllers/deals.controller')
const {addDealsSecSchema } = require('../validations/dealsValidations')

const dealsRouter = require('express').Router()

const validationRequest = require('../../../common/middleware/validationRequest')
const isAuthorized = require('../../../common/middleware/isAuthorized')

const {ADD_TO_DEALS_SEC} = require('../deals.endpoint')



dealsRouter.post('/addToDealsSec',validationRequest(addDealsSecSchema),isAuthorized(ADD_TO_DEALS_SEC),addToDealsSec )
dealsRouter.get('/dealsSec', getDealsSec )


module.exports =dealsRouter