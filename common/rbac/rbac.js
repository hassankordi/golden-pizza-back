const RBAC = require('easy-rbac');
const opt = require('./policy');

const rbac =RBAC.create(opt)

module.exports = rbac;