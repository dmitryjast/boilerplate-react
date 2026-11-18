import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import { SITE_NAME } from '../../data/constants';

import './Policy.scss';

interface PolicyProps {
    title: string;
}

export default function Policy({ title }: PolicyProps) {

    return(
        <>
            <title>{`${title} | ${SITE_NAME}`}</title>
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