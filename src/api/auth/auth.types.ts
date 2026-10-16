// Requests

export interface LoginRequest {
    email: string
    password: string
}

export interface RegisterRequest {
    name: string
    email: string
    password: string
}

export interface VerifyEmailRequest {
    userId: number
    tokenOrCode: string
}

export interface ForgotPasswordRequest {
    email: string
}

export interface ResetPasswordRequest {
    userId: number
    token: string
    newPassword: string
}

// Responses

export interface AuthResponse {
    accessToken: string
}

export interface MeResponse {
    id: number
    name: string
    email: string
    userRole: string
    firstName: string | null
    lastName: string | null
    userPicture: string | null
    verifiedAt: Date | null
    createdAt: Date
    updatedAt: Date
}