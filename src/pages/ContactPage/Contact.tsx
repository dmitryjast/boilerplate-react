import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './Contact.scss';

import heroBackground from '../../assets/img/demo-background.jpg'

export default function Contact() {

    const title = 'Contacts';

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
        </>
    )
}