
const roles = require('../../../enum/roles')
const adminPolicy = require('./adminPolicy')


const opt = {
    [roles.ADMIN]:{can:adminPolicy} , 
    // [roles.USER]:{can:userPolicy} , 
}


module.exports = opt