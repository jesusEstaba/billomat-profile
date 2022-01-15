const express = require('express');

const router = express.Router();
const UserController = require('../controllers/UserController');

/**
 * @swagger
 * components:
 *  schemas:
 *      User:
 *          type: object
 *          properties:
 *              _id:
 *                  type: string
 *              name:
 *                  type: string
 *              age:
 *                  type: integer
 *              bio:
 *                  type: string
 *              image:
 *                  type: string
 *          exampĺe:
 *              _id: 000000000000000000000001
 *              name: Joe Doe
 *              age: 22
 *              bio: A very special guy
 *              image: http://profile-billomat.s3.amazonaws.com/joe_doe_image_profile.png
 *      UserCreateBodyRequest:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              age:
 *                  type: integer
 *              bio:
 *                  type: string
 *              image:
 *                  type: string
 *          required:
 *              - name
 *              - age
 *              - bio
 *              - image
 *      UserUpdateBodyRequest:
 *          type: object
 *          properties:
 *              name:
 *                  type: string
 *              age:
 *                  type: integer
 *              bio:
 *                  type: string
 *              image:
 *                  type: string
 *      UserNotFound:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 *          example:
 *              message: User not found
 *      GenericMessage:
 *          type: object
 *          properties:
 *              message:
 *                  type: string
 */

/**
 * @swagger
 * /api/v1/users:
 *  get:
 *      summary: Get all users
 *      tags: [User]
 *      responses:
 *          200:
 *              description: All users list
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              $ref: '#/components/schemas/User'
 */
router.get('/', UserController.all);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  get:
 *      summary: Find single user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *          200:
 *              description: Single user
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/UserNotFound'
 */
router.get('/:id', UserController.find);

/**
 * @swagger
 * /api/v1/users:
 *  post:
 *      summary: Create user
 *      tags: [User]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/UserCreateBodyRequest'
 *      responses:
 *          201:
 *              description: Single user created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/User'
 *          400:
 *              description: Missing or invalid body fields
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/GenericMessage'
 */
router.post('/', UserController.create);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  put:
 *      summary: Update user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      $ref: '#/components/schemas/UserUpdateBodyRequest'
 *      responses:
 *          204:
 *              description: User updated
 *          400:
 *              description: Invalid body fields
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/GenericMessage'
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/UserNotFound'
 */
router.put('/:id', UserController.update);

/**
 * @swagger
 * /api/v1/users/{id}:
 *  delete:
 *      summary: Delete user by id
 *      tags: [User]
 *      parameters:
 *          - in: path
 *            name: id
 *            schema:
 *              type: string
 *            required: true
 *      responses:
 *          204:
 *              description: User deleted
 *          404:
 *              description: User not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          $ref: '#/components/schemas/UserNotFound'
 */
router.delete('/:id', UserController.destroy);

module.exports = router;
