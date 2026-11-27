import { NavLink } from 'react-router-dom';
import { LayoutDashboard, User, X, type LucideIcon } from 'lucide-react'
import type { MouseEvent } from 'react';

import Logo from '../../Header/Logo';
import DashboardSidebarUser from './DashboardSidebarUser';

import './DashboardSidebar.scss';

interface NavItem {
    label: string;
    link: string;
    icon: LucideIcon;
    end?: boolean;
    badge?: number;
}

interface NavSection {
    title?: string;
    items: NavItem[];
}

const navSections: NavSection[] = [
    {
        title: 'General',
        items: [
            { label: 'Overview', link: '/dashboard', icon: LayoutDashboard, end: true },
        ],
    },
    {
        title: 'Account',
        items: [
            { label: 'Profile', link: '/dashboard/profile', icon: User },
        ],
    },
];

interface DashboardSidebarProps {
    onClose: () => void;
}

export default function DashboardSidebar({ onClose }: DashboardSidebarProps) {

    const handleNavClick = (e: MouseEvent) => {
        if((e.target as HTMLElement).closest('a')) onClose()
    }

    return (
        <aside className='dashboard-sidebar'>
            <div className='dashboard-sidebar-logo'>
                <Logo />
                <button
                    type='button'
                    className='dashboard-sidebar-close'
                    aria-label='Close menu'
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
            </div>
            <nav className='dashboard-sidebar-nav' onClick={handleNavClick}>
                {navSections.map((section, index) => (
                    <div className='nav-section' key={section.title ?? index}>
                        {section.title && (
                            <span className='nav-section-title'>{section.title}</span>
                        )}
                        <ul>
                            {section.items.map(({ label, link, icon: Icon, end, badge }) => (
                                <li key={link}>
                                    <NavLink to={link} end={end}>
                                        <Icon size={18} />
                                        <span className='nav-label'>{label}</span>
                                        {!!badge && (
                                            <span className='nav-badge'>{badge > 99 ? '99+' : badge}</span>
                                        )}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </nav>
            <DashboardSidebarUser />
        </aside>
    )
}
