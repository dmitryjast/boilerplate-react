import { useNavigate } from 'react-router-dom';
import { ChevronDown, UserCog, LogOut } from 'lucide-react'
import { useAuth } from '../../../context/AuthContext';

import DropDown from '../../ui/DropDown/DropDown';
import Avatar from '../../ui/Avatar/Avatar';

export default function DashboardHeaderUser() {

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <DropDown
            className='dashboard-header-user'
            align='right'
            label={
                <div className='user-trigger'>
                    <Avatar name={user?.name} src={user?.userPicture} size={32} />
                    <div className='user-info'>
                        <span className='user-name'>{user?.name}</span>
                        <span className='user-role'>{user?.userRole}</span>
                    </div>
                    <ChevronDown size={16} className='user-chevron' />
                </div>
            }
            header={
                <div className='user-header'>
                    <Avatar name={user?.name} src={user?.userPicture} size={40} />
                    <div className='user-info'>
                        <span className='user-name'>{user?.name}</span>
                        <span className='user-email'>{user?.email}</span>
                    </div>
                </div>
            }
            items={[
                { label: 'Account settings', to: '/dashboard/profile', icon: <UserCog size={18} /> },
                { label: 'Sign out', onClick: handleLogout, icon: <LogOut size={18} />, divider: true, danger: true },
            ]}
        />
    )
}
