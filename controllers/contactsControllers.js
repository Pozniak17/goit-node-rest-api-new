import Contact from "../models/contact.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.send(contacts);
  } catch (error) {
    next(error);
  }
};

export const getOneContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id); //повертає документ або null

    if (contact === null) {
      return res.status(400).send("Contact not found");
    }

    res.send(contact);
  } catch (error) {
    next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await Contact.findByIdAndDelete(id);
    if (result === null) {
      return res.status(404).send("Contact not found");
    }

    res.send({ id });
  } catch (error) {
    next(error);
  }
};

export const createContact = async (req, res, next) => {
  const { error, value } = createContactSchema.validate(req.body, {
    convert: false,
  });

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  try {
    const result = await Contact.create(value); //контакт який створився з id

    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

export const updateContact = async (req, res, next) => {
  const { id } = req.params;

  const { error, value } = updateContactSchema.validate(req.body, {
    convert: false,
  });

  console.log(id);

  if (error) {
    return res.status(404).json({ message: error.message });
  }

  try {
    const contactById = await Contact.findById(id);
    const result = await Contact.findByIdAndUpdate(
      id,
      { ...contactById.toObject(), ...value },
      { new: true }
    );

    res.send(result);
  } catch (error) {
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { error, value } = updateContactSchema.validate(req.body, {
    convert: false,
  });

  if (error) {
    return res.status(404).json({ message: error.message });
  }

  try {
    const result = await Contact.findByIdAndUpdate(
      contactId,
      { ...value, favorite },
      { new: true }
    );

    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
