import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'
import { authApi } from '../api/auth/auth.api'
import type { MeResponse } from '../api/auth/auth.types'

interface AuthContextType {
    user: MeResponse | null
    acessToken: string | null
    isLoading: boolean
    login: (token: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {

    const [user, setUser] = useState<MeResponse | null>(null)
    const [acessToken, setAccesssToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState(true)

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

    const login = (token: string) => {
        setAccesssToken(token)
    }

    const logout = () => {
        setAccesssToken(null)
        setUser(null)
    }

    return (
        <AuthContext.Provider value={{ user, acessToken, isLoading, login, logout }}>
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