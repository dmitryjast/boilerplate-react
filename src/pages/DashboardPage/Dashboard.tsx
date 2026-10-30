import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../components/ui/Button/Button';

import './Dashboard.scss';

export default function Dashboard() {

    const title = 'Dashboard';

    const { logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout();
        navigate("/");
    }

    return (
        <>
            <HeroPage
                title={title}
            />
            <Breadcrumbs
            items={[
                {label: 'Home', link: '/'},
                {label: title},
            ]}
            />
            <section className='section-dashboard pt-60 pb-120'>
                <div className='container'>
                    <div className='section-inner'>
                        <Button type='button' onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </section>
        </>
    )
}
