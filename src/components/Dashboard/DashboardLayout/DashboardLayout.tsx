import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../DashboardHeader/DashboardHeader';

import './DashboardLayout.scss';

export default function DashboardLayout() {

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    useEffect(() => {
        if(!isSidebarOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape') setIsSidebarOpen(false)
        }
        const desktop = window.matchMedia('(min-width: 1025px)')
        const handleDesktop = (e: MediaQueryListEvent) => {
            if(e.matches) setIsSidebarOpen(false)
        }

        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)
        desktop.addEventListener('change', handleDesktop)

        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('keydown', handleKeyDown)
            desktop.removeEventListener('change', handleDesktop)
        }
    }, [isSidebarOpen])

    return (
        <div className={`dashboard-layout ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <DashboardSidebar onClose={() => setIsSidebarOpen(false)} />
            <div className='dashboard-overlay' onClick={() => setIsSidebarOpen(false)} />
            <div className='dashboard-main'>
                <DashboardHeader isMenuOpen={isSidebarOpen} onMenuClick={() => setIsSidebarOpen(true)} />
                <main className='dashboard-content'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
