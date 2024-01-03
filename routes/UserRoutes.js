const express = require("express");

const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();


/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: API endpoints for user registration and login
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Endpoint to register a new user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             example: { message: 'User registered successfully', data: { userId: '123', username: 'john' } }
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             example: { message: 'Invalid input', error: 'Invalid username or password' }
 */
router.post("/register", registerUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login a user
 *     description: Endpoint to log in a registered user.
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             example: { message: 'Login successful', data: { userId: '123', email: 'john', token: 'jwt_token' } }
 *       401:
 *         description: Unauthorized, invalid credentials
 *         content:
 *           application/json:
 *             example: { message: 'Invalid credentials', error: 'email or password is incorrect' }
 */
router.post("/login", loginUser);

/**
 * @swagger
 * /api/auth/current:
 *   get:
 *     summary: Get current user information
 *     description: Endpoint to get information about the currently logged-in user.
 *     tags: [Authentication]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             example: { message: 'User information retrieved successfully', data: { userId: '123', username: 'john' } }
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *         content:
 *           application/json:
 *             example: { message: 'Unauthorized', error: 'Token is missing or invalid' }
 */
router.get("/current", validateToken, currentUser);

// router.post("/register", registerUser);

// router.post("/login", loginUser);

// router.get("/current", validateToken, currentUser);

module.exports = router;
