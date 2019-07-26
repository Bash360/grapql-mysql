const joi = require('@hapi/joi');
const postSchema = {
  firstName: joi
    .string()
    .trim()
    .min(3)
    .required(),
  lastName: joi
    .string()
    .trim()
    .lowercase()
    .min(3)
    .required(),
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .required(),
  phone: joi
    .string()
    .trim()
    .lowercase()
    .max(11)
    .required(),
  gender: joi
    .string()
    .trim()
    .lowercase()
    .max(6)
    .min(4)
    .required(),
  blocked: joi
    .number()
    .max(1)
    .optional()
};
const updateSchema = {
  firstName: joi
    .string()
    .trim()
    .lowercase()
    .min(3)
    .optional(),
  lastName: joi
    .string()
    .trim()
    .lowercase()
    .min(3)
    .optional(),
  email: joi
    .string()
    .trim()
    .lowercase()
    .email()
    .optional(),
  phone: joi
    .string()
    .trim()
    .lowercase()
    .max(11)
    .optional(),
  gender: joi
    .string()
    .trim()
    .lowercase()
    .max(6)
    .min(4)
    .optional()
};
const searcSchema = {
  q: joi
    .string()
    .required()
    .lowercase()
};
module.exports = {postSchema,updateSchema,searchSchema};