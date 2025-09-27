import { z } from 'zod';

const login = z.string()
    .min(3, "Login must be at least 3 characters long")
    .max(32, "Login must be at most 32 characters long")
    .regex(/^[a-zA-Z0-9_]+$/, "Login can only contain letters, numbers, and underscores");

const password = z.string()
    .min(8, "Password must be at least 8 characters long")
    .max(320, "Password must be at most 320 characters long");

const email = z.email("Please enter a valid email address")
    .max(320, "Email is too long");

const name = z.string() .min(2, "Name must be at least 2 characters long")
    .max(32, "Name must be at most 50 characters long")
    .regex(/^[\p{L}\p{M} -]+$/u, "Name can only contain letters, spaces, and hyphens");

export { login, password, email, name };
