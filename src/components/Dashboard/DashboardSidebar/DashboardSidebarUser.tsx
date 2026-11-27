import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext';

export default function DashboardSidebarUser() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const initials = (user?.name ?? '')
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <div className='dashboard-sidebar-user'>
            <div className='user-avatar'>
                {user?.userPicture
                    ? <img src={user.userPicture} alt={user.name} />
                    : initials
                }
            </div>
            <div className='user-info'>
                <div className='user-name-row'>
                    <span className='user-name'>{user?.name}</span>
                    {user?.userRole && (
                        <span className='user-role' title={user.userRole}>{user.userRole}</span>
                    )}
                </div>
                <span className='user-email'>{user?.email}</span>
            </div>
            <button
                type='button'
                className='user-logout'
                aria-label='Log out'
                title='Log out'
                onClick={handleLogout}
            >
                <LogOut size={18} />
            </button>
        </div>
    )
}
