const express = require('express');
const router = express();

const{ permissionAddValidator } = require('./adminValidator');
const{ addPermissions } = require('../controller/admin/permissionController')

router.post('/addpermission', permissionAddValidator, addPermissions);

module.exports = router;