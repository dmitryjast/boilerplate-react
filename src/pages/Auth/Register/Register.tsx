import HeroPage from '../../../components/Hero/HeroPage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';

import './Register.scss'

import heroBackground from '../../../assets/img/demo-background.jpg'

export default function Register() {

    const title = 'Register';

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