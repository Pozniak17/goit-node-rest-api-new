import HttpError from "../helpers/HttpError.js";

import Contact from "../models/contact.js";

import {
  createContactSchema,
  updateContactSchema,
  updateStatusContactSchema,
} from "../schemas/contactsSchemas.js";
// import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.status(200).send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).send(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndDelete(id);
    if (!contact) {
      throw HttpError(404);
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { error, value } = createContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const newContact = await Contact.create(value);

    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  const { error, value } = updateContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const contact = await Contact.findByIdAndUpdate(id, value, { new: true });

    if (!contact) {
      return res.status(404).json({ message: error.message });
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { error, value } = updateStatusContactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const contact = await Contact.findByIdAndUpdate(contactId, value, {
      new: true,
    });

    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};
