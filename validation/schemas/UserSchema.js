const { z } = require('zod');

const { login, email, password, name } = require("./GeneralSchemas");

const schema = {
    new_user: z.object({
        login,
        firstname: name,
        lastname: name,
        email,
        password,
        password_confirmation: z.string().min(1, "Please confirm the password"),
        role: z.enum(["ADMIN", "USER"]),
    }).refine((data) => data.password === data.password_confirmation, {
        message: "Passwords must match",
        path: ["password_confirmation"]
    }),
    update_user: z.object({
        login,
        firstname: name,
        lastname: name,
        email,
        password,
    }),
}

module.exports = schema;
