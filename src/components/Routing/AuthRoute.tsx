import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface AuthRouteProps {
    children?: React.ReactNode
    requireAuth?: boolean
}

export default function AuthRoute({ children, requireAuth = false }: AuthRouteProps) {
    const { user, isLoading } = useAuth()
    const location = useLocation()

    if(isLoading) return null // Wait for auth check

    if(requireAuth && !user)
        return <Navigate to="/login" state={{ from: location }} replace />

    if(!requireAuth && user)
        return <Navigate to="/" replace />

    return children ? <>{children}</> : <Outlet />
}