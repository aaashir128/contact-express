const asyncHandler = require("express-async-handler");
const contactModels = require("../models/contactModels");

//@des Get all contacts
//@route Get /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
  const contacts = await contactModels.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

//@des crete new contact
//@route Post /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("all fields are mandatory");
  }
  const contacts = await contactModels.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contacts);
});

//@des get  contact
//@route Get /api/contacts/:id
//@access private
const getContactById = asyncHandler(async (req, res) => {
  const contacts = await contactModels.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contacts);
});

//@des update  contact
//@route Put /api/contacts/:id
//@access private
const updateContactById = asyncHandler(async (req, res) => {
  const contacts = await contactModels.findById(req.params.id);
  if (!contacts) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contacts.user_id?.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not have permission to access other user contact");
  }

  const updateContact = await contactModels.findByIdAndUpdate(
    req.params.id,
    req.body
  );
  res.status(200).json(updateContact);
});

//@des delete  contact
//@route Delete /api/contacts/:id
//@access private
const deleteContactById = asyncHandler(async (req, res) => {
  const contact = await contactModels.findById(req.params.id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  if (contact.user_id?.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not have permission to access other user contact");
  }

  await contactModels.findByIdAndDelete(req.params.id); // Use findByIdAndDelete to remove the contact

  res.status(200).json(contact);
});

module.exports = {
  getContact,
  createContact,
  getContactById,
  updateContactById,
  deleteContactById,
};
