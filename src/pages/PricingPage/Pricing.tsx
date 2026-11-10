import { Link } from 'react-router-dom';

import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import Button from '../../components/ui/Button/Button';

import './Pricing.scss';

import { Check } from 'lucide-react';

const plans = [
    {
        name: 'Starter',
        description: 'For individuals getting started.',
        price: '$0',
        popular: false,
        features: ['1 user', 'Up to 3 projects', 'Basic analytics', 'Email support']
    },
    {
        name: 'Pro',
        description: 'For growing teams that need more.',
        price: '$29',
        popular: true,
        features: ['Up to 10 users', 'Unlimited projects', 'Advanced analytics', 'Automation', 'Priority support']
    },
    {
        name: 'Business',
        description: 'For companies with advanced needs.',
        price: '$99',
        popular: false,
        features: ['Unlimited users', 'Unlimited projects', 'Custom reports', 'Roles and permissions', 'Dedicated support']
    }
]

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
            <section className='section-pricing pt-60 pb-120'>
                <div className='container'>
                    <div className='section-inner'>
                        <div className='section-head'>
                            <h2>Simple, transparent pricing</h2>
                            <p>Start for free and upgrade as your team grows. All plans include a 14-day free trial.</p>
                        </div>
                        <div className='plans-wrapper'>
                            {plans.map((plan) => (
                                <div className={`plan-item ${plan.popular ? 'popular' : ''}`} key={plan.name}>
                                    {plan.popular && (
                                        <span className='plan-badge'>Most popular</span>
                                    )}
                                    <div className='plan-head'>
                                        <h4>{plan.name}</h4>
                                        <p>{plan.description}</p>
                                    </div>
                                    <div className='plan-price'>
                                        <strong>{plan.price}</strong>
                                        <span>/ month</span>
                                    </div>
                                    <Button as={Link} to='/register' variant={plan.popular ? 'primary' : 'secondary'}>
                                        Get started
                                    </Button>
                                    <ul>
                                        {plan.features.map((feature) => (
                                            <li key={feature}>
                                                <Check size={18} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
