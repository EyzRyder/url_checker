import { z } from 'zod';

export const metatagsSchema = z.object({
    title: z
        .string(),
    favicon: z
        .string(),
    description: z
        .string(),
    img: z
        .string()
        .startsWith("https://", { message: "Must provide secure URL" }),
});

export type MetaTags = z.infer<typeof metatagsSchema>;
