import { z } from "zod";


export const createTaskShema = z.object({
    title:z.string({
        required_error:'Title is required'
    }),
    description:z.string({
        required_error:'Description is required'
    })
    .optional(),
    date: z.string().datetime().optional(),
})