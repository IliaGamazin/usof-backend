import { z } from 'zod';

import { login, password, email, name } from './GeneralSchemas.js';

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

export default schema;
