import Contact from "../models/contact.js";
import HttpError from "../helpers/HttpError.js";
// import {
//   createContactSchema,
//   updateContactSchema,
//   updateStatusContactSchema,
// } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();

    res.status(200).send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
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
    const result = await Contact.findByIdAndDelete(id);

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  // const { error } = createContactSchema.validate(req.body);

  try {
    // if (error) {
    //   throw HttpError(400, error.message);
    // }

    if (!result) {
      throw HttpError(404);
    }

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;
  // const { error } = updateContactSchema.validate(req.body);

  try {
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    // if (error) {
    //   throw HttpError(400, error.message);
    // }

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { id } = req.params;
  const { favorite } = req.body;

  // const { error } = updateStatusContactSchema.validate(req.body);

  try {
    const result = await Contact.findByIdAndUpdate(
      id,
      { favorite },
      { new: true }
    );

    // if (error) {
    //   throw HttpError(400, error.message);
    // }

    if (!result) {
      throw HttpError(404);
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};
