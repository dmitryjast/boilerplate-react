import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './Pricing.scss';

export default function Pricing() {

    const title = 'Pricing';

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