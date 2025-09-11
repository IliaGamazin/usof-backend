const { z } = require('zod');

const title = z.string()
    .min(1, "Please enter a valid title")
    .max(20, "Please enter a valid description");

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
