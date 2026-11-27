import { Outlet } from 'react-router-dom';

import DashboardSidebar from '../DashboardSidebar/DashboardSidebar';
import DashboardHeader from '../DashboardHeader/DashboardHeader';

import './DashboardLayout.scss';

export default function DashboardLayout() {

    return (
        <div className='dashboard-layout'>
            <DashboardSidebar />
            <div className='dashboard-main'>
                <DashboardHeader />
                <main className='dashboard-content'>
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
