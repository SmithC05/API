const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    'any.required': 'Name is required',
    'string.empty': 'Name is required',
    'string.min': 'Name must be at least 2 characters long',
    'string.max': 'Name must be less than 100 characters'
  }),
  email: Joi.string().trim().lowercase().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address'
  }),
  password: Joi.string().min(6).max(100).required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required',
    'string.min': 'Password must be at least 6 characters long',
    'string.max': 'Password must be less than 100 characters'
  })
});

const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required().messages({
    'any.required': 'Email is required',
    'string.empty': 'Email is required',
    'string.email': 'Please provide a valid email address'
  }),
  password: Joi.string().required().messages({
    'any.required': 'Password is required',
    'string.empty': 'Password is required'
  })
});

const createTaskSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).required().messages({
    'any.required': 'Title is required',
    'string.empty': 'Title is required',
    'string.min': 'Title must be at least 2 characters long',
    'string.max': 'Title must be less than 150 characters'
  }),
  description: Joi.string().trim().allow('').max(1000).optional().messages({
    'string.max': 'Description must be less than 1000 characters'
  })
});

const updateTaskSchema = Joi.object({
  title: Joi.string().trim().min(2).max(150).messages({
    'string.empty': 'Title cannot be empty',
    'string.min': 'Title must be at least 2 characters long',
    'string.max': 'Title must be less than 150 characters'
  }),
  description: Joi.string().trim().allow('').max(1000).messages({
    'string.max': 'Description must be less than 1000 characters'
  })
})
  .min(1)
  .messages({
    'object.min': 'Provide at least a title or description to update'
  });

module.exports = {
  registerSchema,
  loginSchema,
  createTaskSchema,
  updateTaskSchema
};
