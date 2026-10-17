import { Link } from 'react-router-dom';

import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../components/ui/Button/Button';

import './NotFound.scss';

import heroBackground from '../../assets/img/demo-background.jpg'

export default function NotFound() {

    const title = 'Page Not Found';

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
                        <p>The page you are looking for doesn't exist or has been moved.</p>
                        <Button as={Link} to='/'>Back to Home</Button>
                    </div>
                </div>
            </section>
        </>
    )
}
