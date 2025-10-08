import HttpError from "../helpers/HttpError.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";
import contactsService from "../services/contactsServices.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const data = await contactsService.listContacts();
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  try {
    const { id } = req.params;

    const data = await contactsService.getContactById(id);
    if (!data) {
      throw HttpError(404);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await contactsService.removeContact(id);
    if (!data) {
      throw HttpError(404);
    }
    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  try {
    const { error, value } = createContactSchema.validate(req.body);

    console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { name, email, phone } = value;

    const data = await contactsService.addContact(name, email, phone);
    res.status(201).send(data);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { error, value } = updateContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const data = await contactsService.updateContact(id, value);

    if (!data) {
      throw HttpError(404);
    }

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
};
