import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../components/ui/Button/Button';

import './Dashboard.scss';

import heroBackground from '../../assets/img/demo-background.jpg'

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
                background={heroBackground}
            />
            <Breadcrumbs
            items={[
                {label: 'Home', link: '/'},
                {label: title},
            ]}
            />
            <section>
                <div className='container'>
                    <div className='section-inner'>
                        <Button type='button' onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </section>
        </>
    )
}
