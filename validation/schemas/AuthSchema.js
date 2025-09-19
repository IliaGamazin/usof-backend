const { z } = require('zod');

const { login, password, email, name } = require('./GeneralSchemas');

const schema = {
    register: z.object({
        login,
        firstname: name,
        lastname: name,
        email,
        password,
        password_confirmation: z.string().min(1, "Please confirm the password"),
    }).refine((data) => data.password === data.password_confirmation, {
        message: "Passwords must match",
        path: ["password_confirmation"]
    }),

    login: z.object({
        login,
        email,
        password,
    }),
}

module.exports = schema;
