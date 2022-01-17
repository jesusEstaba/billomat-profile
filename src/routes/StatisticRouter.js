const express = require('express');

const router = express.Router();
const StatisticController = require('../controllers/StatisticController');

/**
 * @swagger
 * /api/v1/statistics/avg:
 *  get:
 *      summary: Get users average age
 *      tags: [Statistic]
 *      responses:
 *          200:
 *              description: Users average statistics
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              average_age: integer
 *                          example:
 *                              average_age: 23.45
 */
router.get('/avg', StatisticController.average);

module.exports = router;
