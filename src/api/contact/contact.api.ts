import api from "../axios"
import type { ContactRequest } from './contact.types'

export const contactApi = {
    send: (data: ContactRequest) =>
        api.post('/contact', data),
}
