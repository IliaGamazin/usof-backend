import { z } from 'zod';

import { login, password, email, name } from './GeneralSchemas.js';

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

export default schema;
