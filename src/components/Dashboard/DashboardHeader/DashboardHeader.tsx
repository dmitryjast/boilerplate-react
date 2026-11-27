import { useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react'

import Clock from '../../ui/Clock/Clock';
import DashboardHeaderUser from './DashboardHeaderUser';

import './DashboardHeader.scss';

const pageTitles: Record<string, string> = {
    '/dashboard': 'Overview',
    '/dashboard/profile': 'Profile',
    '/dashboard/password': 'Change Password',
};

interface DashboardHeaderProps {
    isMenuOpen: boolean;
    onMenuClick: () => void;
}

export default function DashboardHeader({ isMenuOpen, onMenuClick }: DashboardHeaderProps) {

    const { pathname } = useLocation()

    const title = pageTitles[pathname.replace(/\/+$/, '') || '/'] ?? '';

    return (
        <header className='dashboard-header'>
            <button
                type='button'
                className='dashboard-header-menu'
                aria-label='Open menu'
                aria-expanded={isMenuOpen}
                onClick={onMenuClick}
            >
                <Menu size={20} />
            </button>
            <h1 className='dashboard-header-title'>{title}</h1>
            <Clock className='dashboard-header-clock' />
            <DashboardHeaderUser />
        </header>
    )
}
