import { z } from 'zod'

export const forgotSchema = z.object({
    email: z.string().trim().email('Invalid email address'),
})

export type ForgotFormData = z.infer<typeof forgotSchema>