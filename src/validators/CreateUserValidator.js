const { body } = require('express-validator/check');

exports.validate = () => [
    body('name').isString().not().isEmpty(),
    body('age').isInt({ min: 1 }),
    body('bio').isString().not().isEmpty(),
    body('image').isURL(),
];
