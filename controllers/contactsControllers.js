import Contact from "../models/contact.js";
import HttpError from "../helpers/HttpError.js";
import user from "../models/user.js";
// import {
//   createContactSchema,
//   updateContactSchema,
//   updateStatusContactSchema,
// } from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user.id });

    res.status(200).send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findOne({ _id: id, owner: req.user.id });
    if (contact === null) {
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
  const contact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    favorite: req.body.favorite,
    owner: req.user.id, //нове поле, яке ми витягуємо з req.user.id, це ті що decode
  };

  // const { error } = createContactSchema.validate(req.body);

  try {
    // if (error) {
    //   throw HttpError(400, error.message);
    // }
    const result = await Contact.create(contact);
    if (result === null) {
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
    const result = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      req.body,
      { new: true }
    );

    // if (error) {
    //   throw HttpError(400, error.message);
    // }

    if (result === null) {
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
    const result = await Contact.findOneAndUpdate(
      { _id: id, owner: req.user.id },
      { favorite },
      { new: true }
    );

    // if (error) {
    //   throw HttpError(400, error.message);
    // }

    if (result === null) {
      throw HttpError(404);
    }

    res.send(result);
  } catch (error) {
    next(error);
  }
};
