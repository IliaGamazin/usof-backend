const { z } = require('zod');

const login = z.string()
    .min(3, "Login must be at least 3 characters long")
    .max(32, "Login must be at most 32 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, 'Login can only contain letters, numbers, and underscores');

const password = z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(320, "Password must be at most 320 characters long");

const email = z.email("Please enter a valid email address")
    .max(320, "Email is too long");

const schema = {
    register: z.object({
        login: login,
        email: email,
        password: password,
        password_confirmation: z.string().min(1, "Please confirm the password"),
    }).refine((data) => data.password === data.password_confirmation, {
        message: "Passwords must match",
        path: ["password_confirmation"]
    }),

    login: z.object({
        login: login,
        email: email,
        password: password,
    }),
}

module.exports = schema;
