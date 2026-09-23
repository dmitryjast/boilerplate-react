import axios from 'axios'


const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    withCredentials: true, // Send httponly cookies (refresh token) with each request
})

// Request interceptor — add Bearer token to every request
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('accessToken')
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

// Response interceptor — refresh token on 401
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config // Save request for repeat after token update

        if(error.response?.status === 401 && !originalRequest._retry && !originalRequest.url?.includes('/auth/refresh')) {
            originalRequest._retry = true // Mark request as retried to prevent infinite loop. Objects are passed by reference, so this change will be visible on next interceptor call

            try {
                const response = await api.post('/auth/refresh')
                const newToken = response.data.accessToken
                localStorage.setItem('accessToken', newToken)
                originalRequest.headers.Authorization = `Bearer ${newToken}` // Update request titl with new token
                return api(originalRequest)
            } catch {
                localStorage.removeItem('accessToken')
                const publicRoutes = ['/login', '/register', '/forgot', '/reset-password', '/verify-email']
                if(!publicRoutes.includes(window.location.pathname)) {
                    window.location.href = '/login'
                }
            }
        }

        return Promise.reject(error) // Result of async operation: Promise.pending / Promise.resolved / Promise.rejected
    }
)

export default api

/*

// External API — for example, Google Maps, weather, etc.
const googleMapsApi = axios.create({
    baseURL: 'https://maps.googleapis.com',
})

// Payment API — different domain, different headers
const stripeApi = axios.create({
    baseURL: 'https://api.stripe.com',
    headers: { Authorization: `Bearer ${STRIPE_KEY}` }
})

*/

