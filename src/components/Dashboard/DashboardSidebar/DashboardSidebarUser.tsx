import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext';

import Avatar from '../../ui/Avatar/Avatar';

export default function DashboardSidebarUser() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <div className='dashboard-sidebar-user'>
            <Avatar name={user?.name} src={user?.userPicture} />
            <div className='user-info'>
                <span className='user-name'>{user?.name}</span>
                <span className='user-role'>{user?.userRole}</span>
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
