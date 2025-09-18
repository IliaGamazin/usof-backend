const { z } = require('zod');

const title = z.string()
    .min(1, "Please enter a valid title")
    .max(20, "Please enter a valid description")
    .regex(/^(?=.*[a-zA-Z0-9])[a-zA-Z0-9@_/.\-\\# ]+$/, "Invalid characters used");

const description = z.string()
    .min(20, "Please enter a valid description")
    .max(320, "Please enter a valid description");

const schema = {
    update_category: z.object({
        title,
        description
    }),
}

module.exports = schema;
