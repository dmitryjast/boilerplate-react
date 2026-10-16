import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authApi } from '../api/auth/auth.api'
import type { MeResponse } from '../api/auth/auth.types'

interface AuthContextType {
    user: MeResponse | null
    accessToken: string | null
    isLoading: boolean
    refreshUser: () => Promise<void>
    login: (token: string) => Promise<void>
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<MeResponse | null>(null)
    const [accessToken, setAccessToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const refreshUser = async () => {
        try {
            const response = await authApi.me()
            setUser(response.data)
        } catch {
            setUser(null)
        }
    }


    // Check if user is logged in on app start
    useEffect(() => {
        const initAuth = async () => {
            try { // trying to get user data
                const response = await authApi.me()
                setUser(response.data)
            } catch { // if not logged, catch error and set null
                setUser(null)
            } finally { // say app that check is finished
                setIsLoading(false)
            }
        }
        initAuth()
    }, [])

    const login = async (token: string) => {
        setAccessToken(token)
        localStorage.setItem('accessToken', token)
        
        try {
            const response = await authApi.me()
            setUser(response.data)
        } catch (err) {
            console.error(err)
        }
    }

    const logout = async () => {
        try {
            await authApi.logout()
        } catch (err) {
            console.error(err)
        } finally {
            setAccessToken(null)
            setUser(null)
            localStorage.removeItem('accessToken')
        }
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, isLoading, refreshUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext)
    
    if(!context) {
        throw new Error('useAuth must be used within AuthProvider')
    }

    return context
}