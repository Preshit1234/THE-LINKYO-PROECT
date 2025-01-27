const { check } = require('express-validator')

// exports.registerValidator = [
//     check('name', 'Name is required').not().isEmpty(),
//     check('email', 'Please include a valid email').isEmail().normalizeEmail({
//         gmail_remove_dots:true
//     }),
//     check('password', 'password is required').not().isEmpty(),
// ];

// exports.loginvalidator = [
//     check('email', 'Please include a valid email').isEmail().normalizeEmail({
//         gmail_remove_dots: true
//     }),
//     check('password', 'Password is required').not().isEmpty(),
// ]

exports.permissionAddValidator = [
    check('permission_name', 'Permission is required').isEmail().normalizeEmail({
        gmail_remove_dots: true
    }),
]