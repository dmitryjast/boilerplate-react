import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './Features.scss';

import { Check, LayoutDashboard, ShieldCheck, Users, Workflow } from 'lucide-react';

const features = [
    {
        icon: LayoutDashboard,
        title: 'Dashboard & analytics',
        text: 'See the state of your business at a glance and dig into the details when you need to.',
        points: ['Customizable widgets', 'Real-time metrics', 'Export to CSV and PDF']
    },
    {
        icon: Users,
        title: 'Team management',
        text: 'Bring your whole team into one workspace and control who can see and do what.',
        points: ['Invite by email', 'Roles and permissions', 'Activity history']
    },
    {
        icon: Workflow,
        title: 'Automation',
        text: 'Set up rules once and let the platform handle repetitive work for you.',
        points: ['Trigger-based workflows', 'Scheduled tasks', 'Email and in-app actions']
    },
    {
        icon: ShieldCheck,
        title: 'Security',
        text: 'Your data is protected by industry best practices from day one.',
        points: ['Encryption in transit and at rest', 'Secure sessions', 'Email verification']
    }
]

export default function Features() {

    const title = 'Features';

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
            <section className='section-features-details pt-60 pb-120'>
                <div className='container'>
                    <div className='section-inner'>
                        <div className='section-head'>
                            <span className='eyebrow'>Core features</span>
                            <h2>Built for the way your team works</h2>
                            <p>Powerful tools that stay simple to use, no matter how big your team gets.</p>
                        </div>
                        <div className='details-wrapper'>
                            {features.map((item) => (
                                <div className='detail-item' key={item.title}>
                                    <div className='icon-wrapper'>
                                        <item.icon size={22} />
                                    </div>
                                    <h4>{item.title}</h4>
                                    <p>{item.text}</p>
                                    <ul>
                                        {item.points.map((point) => (
                                            <li key={point}>
                                                <Check size={18} />
                                                {point}
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
