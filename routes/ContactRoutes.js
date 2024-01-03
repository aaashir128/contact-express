const express = require("express");
const {
  getContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");
const router = express.Router();

router.use(validateToken);
// router.route("/").get(getContact);

// router.route("/").post(createContact);

// router.route("/:id").get(getContactById);

// router.route("/:id").put(updateContactById);

// router.route("/:id").delete(deleteContactById);

// module.exports = router;

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Endpoint to retrieve a list of all contacts.
 *     tags: [Contacts]
 *     security:
 *       - BearerAuth: []  // Reference the BearerAuth security definition
 
 */

/**
 * @swagger
 * tags:
 *   name: Contacts
 *   description: API endpoints for managing contacts
 */

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Get all contacts
 *     description: Endpoint to retrieve a list of all contacts.
 *     tags: [Contacts]
 */
router.route("/").get(getContact);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     description: Endpoint to create a new contact.
 *     tags: [Contacts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contact created successfully
 *         content:
 *           application/json:
 *             example: { message: 'Contact created successfully', data: { contact } }
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             example: { message: 'Invalid input', error: 'Invalid contact data' }
 */
router.route("/").post(createContact);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Get a contact by ID
 *     description: Endpoint to retrieve a contact by its ID.
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact retrieved successfully
 *         content:
 *           application/json:
 *             example: { message: 'Contact retrieved successfully', data: { contact } }
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             example: { message: 'Contact not found', error: 'Contact not found with the given ID' }
 */
router.route("/:id").get(getContactById);

/**
 * @swagger
 * /api/contacts/{id}:
 *   put:
 *     summary: Update a contact by ID
 *     description: Endpoint to update a contact by its ID.
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contact updated successfully
 *         content:
 *           application/json:
 *             example: { message: 'Contact updated successfully', data: { updatedContact } }
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             example: { message: 'Contact not found', error: 'Contact not found with the given ID' }
 *       400:
 *         description: Bad request, invalid input
 *         content:
 *           application/json:
 *             example: { message: 'Invalid input', error: 'Invalid contact data' }
 */
router.route("/:id").put(updateContactById);

/**
 * @swagger
 * /api/contacts/{id}:
 *   delete:
 *     summary: Delete a contact by ID
 *     description: Endpoint to delete a contact by its ID.
 *     tags: [Contacts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the contact to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Contact deleted successfully
 *         content:
 *           application/json:
 *             example: { message: 'Contact deleted successfully', data: { deletedContact } }
 *       404:
 *         description: Contact not found
 *         content:
 *           application/json:
 *             example: { message: 'Contact not found', error: 'Contact not found with the given ID' }
 */
router.route("/:id").delete(deleteContactById);

module.exports = router;
