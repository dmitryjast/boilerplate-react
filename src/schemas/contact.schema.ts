import { z } from 'zod'

export const contactSchema = z.object({
    name: z.string().trim().min(2, 'Name must be at least 2 characters'),
    email: z.string().trim().email('Invalid email address'),
    subject: z.string().trim().min(3, 'Subject must be at least 3 characters').max(150, 'Subject must be at most 150 characters'),
    message: z.string().trim().min(10, 'Message must be at least 10 characters').max(2000, 'Message must be at most 2000 characters'),
})

export type ContactFormData = z.infer<typeof contactSchema>
