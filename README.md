# Base commands:

npm run setup    — Fill in environment variables


# Example of API use

1. Way

authApi.login({ email, password })
    ↓
axios.post('http://localhost:3000/auth/login', { email, password })
    ↓ withCredentials: true — Cookie send
    ↓ Authorization: Bearer token — add later using interceptor
    ↓
NestJS get request
    ↓
return { accessToken }
    ↓
authApi.login() resolve with { data: { accessToken } }


2. Component use
const response = await authApi.login({ email, password })
const token = response.data.accessToken
