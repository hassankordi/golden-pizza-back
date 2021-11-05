
const { ADD_TO_PIZZA_SEC, GET_PIZZA_SEC } = require('../../../modules/pizza/pizza.endpoint')
const { GET_ALL_USERS, BOLCK_USER } = require('../../../modules/user/userEndpoints')

const { ADD_TO_SPECIALITY_SEC, GET_SPECIALITY_SEC } = require('../../../modules/speciality/speciality.endpoint')
const { ADD_TO_COMBOS_SEC } = require('../../../modules/combos/combos.endpoint')
const { ADD_TO_DEALS_SEC } = require('../../../modules/deals/deals.endpoint')
const { ADD_TO_ADDITIONS_SEC } = require('../../../modules/additions/additions.endpoint')

ADD_TO_COMBOS_SEC
module.exports = [
    GET_ALL_USERS,
    BOLCK_USER,


    ADD_TO_PIZZA_SEC,
    GET_PIZZA_SEC,

    ADD_TO_SPECIALITY_SEC,
    GET_SPECIALITY_SEC,

    ADD_TO_COMBOS_SEC ,

    ADD_TO_DEALS_SEC,

    ADD_TO_ADDITIONS_SEC



]