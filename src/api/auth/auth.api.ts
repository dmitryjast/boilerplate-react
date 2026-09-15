import { data } from "react-router-dom"
import api from "../axios"
import type {
    LoginRequest,
    RegisterRequest,
    AuthResponse,
    MeResponse,
    VerifyEmailRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest
} from './auth.types'

export const authApi = { // Group in one object with functions and methods
    login: (data: LoginRequest) => 
        api.post<AuthResponse>('/auth/login', data),

    register: (data: RegisterRequest) => 
        api.post<AuthResponse>('/auth/register', data), // Say that will be response <AuthResponse> as { accessToken: string }, data - request body

    logout: () => 
        api.post('/auth/logout'),

    refresh: () => 
        api.post<AuthResponse>('/auth/refresh'),

    me: () => 
        api.get<MeResponse>('/auth/me'),

    verifyEmail: (data: VerifyEmailRequest) => 
        api.post('/auth/verify-email', data),

    forgotPassword: (data: ForgotPasswordRequest) => 
        api.post('/auth/forgot-password', data),

    resetPassword: (data: ResetPasswordRequest) => 
        api.post('/reset-password', data),

}

