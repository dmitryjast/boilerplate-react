import HeroPage from '../../../components/Hero/HeroPage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';

import './Login.scss'

import heroBackground from '../../../assets/img/demo-background.jpg'

export default function Login() {

    const title = 'Login';

    return(
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
        </>
    )
}