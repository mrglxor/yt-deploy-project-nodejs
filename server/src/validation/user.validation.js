import Joi from "joi";

const registerUserValidation = Joi.object({
    username: Joi.string().min(6).max(20).required(),
    password: Joi.string().min(7).max(50).required(),
    name: Joi.string().min(3).max(50).required()
});

const loginUserValidation = Joi.object({
    username: Joi.string().min(6).max(20).required(),
    password: Joi.string().min(7).max(50).required()
});

const getUserValidation = Joi.string().max(100).required();

export {
    registerUserValidation,
    loginUserValidation,
    getUserValidation
}