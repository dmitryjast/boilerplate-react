import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User } from 'lucide-react'

import Logo from '../../Header/Logo';
import DashboardSidebarUser from './DashboardSidebarUser';

import './DashboardSidebar.scss';

const navItems = [
    { label: 'Overview', link: '/dashboard', icon: LayoutDashboard, end: true },
    { label: 'Profile', link: '/dashboard/profile', icon: User, end: false },
];

export default function DashboardSidebar() {

    return (
        <aside className='dashboard-sidebar'>
            <div className='dashboard-sidebar-logo'>
                <Logo />
            </div>
            <nav className='dashboard-sidebar-nav'>
                <ul>
                    {navItems.map(({ label, link, icon: Icon, end }) => (
                        <li key={link}>
                            <NavLink to={link} end={end}>
                                <Icon size={18} />
                                {label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
            <DashboardSidebarUser />
        </aside>
    )
}
