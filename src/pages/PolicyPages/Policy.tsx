import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './Policy.scss';

import heroBackground from '../../assets/img/demo-background.jpg'

interface PolicyProps {
    title: string;
}

export default function Policy({ title }: PolicyProps) {

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