import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './Contact.scss';

export default function Contact() {

    const title = 'Contact';

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
        </>
    )
}