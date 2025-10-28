import Joi from "joi";

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(3).max(15),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(15),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean().required(),
});
