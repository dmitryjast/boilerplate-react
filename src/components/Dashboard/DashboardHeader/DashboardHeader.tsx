import { useLocation } from 'react-router-dom';

import Clock from '../../ui/Clock/Clock';
import DashboardHeaderUser from './DashboardHeaderUser';

import './DashboardHeader.scss';

const pageTitles: Record<string, string> = {
    '/dashboard': 'Overview',
    '/dashboard/profile': 'Profile',
    '/dashboard/password': 'Change Password',
};

export default function DashboardHeader() {

    const { pathname } = useLocation()

    const title = pageTitles[pathname.replace(/\/+$/, '') || '/'] ?? '';

    return (
        <header className='dashboard-header'>
            <h1 className='dashboard-header-title'>{title}</h1>
            <Clock className='dashboard-header-clock' />
            <DashboardHeaderUser />
        </header>
    )
}
