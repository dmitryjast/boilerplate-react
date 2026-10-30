import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './Policy.scss';

interface PolicyProps {
    title: string;
}

export default function Policy({ title }: PolicyProps) {

    return(
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