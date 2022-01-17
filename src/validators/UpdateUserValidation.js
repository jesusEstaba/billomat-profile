const { body } = require('express-validator/check');

exports.validate = () => [
    body('name').optional().isString().isLength({ min: 1 }),
    body('age').optional().isInt({ min: 1 }),
    body('bio').optional().isString().isLength({ min: 1 }),
    body('image').optional().isURL(),
];
