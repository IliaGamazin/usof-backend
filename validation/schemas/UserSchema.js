const { z } = require('zod');

const { login, email, password } = require("./GeneralSchemas");

const schema = {
    new_user: z.object({
        login: login,
        email: email,
        password: password,
        password_confirmation: z.string().min(1, "Please confirm the password"),
        role: z.enum(["ADMIN", "USER"]),
    }).refine((data) => data.password === data.password_confirmation, {
        message: "Passwords must match",
        path: ["password_confirmation"]
    })
}

module.exports = schema;
