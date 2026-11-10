import { Link } from 'react-router-dom';

import HeroHome from '../../components/Hero/HeroHome';
import Button from '../../components/ui/Button/Button';
import Accordion from '../../components/ui/Accordion/Accordion';

import './Home.scss';

import { ArrowRight, BarChart3, Bell, Lock, Users, Workflow, Zap } from 'lucide-react';

const features = [
    {
        icon: Zap,
        title: 'Fast setup',
        text: 'Create an account and start working in minutes. No complex configuration required.'
    },
    {
        icon: BarChart3,
        title: 'Real-time analytics',
        text: 'Track key metrics on a clear dashboard and make decisions based on live data.'
    },
    {
        icon: Users,
        title: 'Team collaboration',
        text: 'Invite your team, share work and keep everyone on the same page.'
    },
    {
        icon: Workflow,
        title: 'Automation',
        text: 'Automate routine tasks and focus on the work that actually matters.'
    },
    {
        icon: Lock,
        title: 'Secure by default',
        text: 'Encrypted data, secure sessions and email verification out of the box.'
    },
    {
        icon: Bell,
        title: 'Smart notifications',
        text: 'Get notified about important events by email or right in the app.'
    }
]

const steps = [
    {
        title: 'Create an account',
        text: 'Sign up with your email and verify it in one click.'
    },
    {
        title: 'Set up your workspace',
        text: 'Invite your team and connect the tools you already use.'
    },
    {
        title: 'Grow your business',
        text: 'Track results on the dashboard and scale as you grow.'
    }
]

const faqItems = [
    {
        label: 'Is there a free trial?',
        content: 'Yes. Every plan starts with a 14-day free trial. No credit card is required to sign up.'
    },
    {
        label: 'Can I change my plan later?',
        content: 'You can upgrade or downgrade at any time from the dashboard. Changes are applied immediately and billed pro rata.'
    },
    {
        label: 'How secure is my data?',
        content: 'All data is encrypted in transit and at rest. Access is protected with secure sessions and email verification.'
    },
    {
        label: 'Can I invite my team?',
        content: 'Yes. Invite teammates by email and manage their roles and permissions from the settings page.'
    },
    {
        label: 'How do I cancel my subscription?',
        content: 'You can cancel at any time from the billing settings. Your account stays active until the end of the paid period.'
    }
]

export default function Home() {
    return(
        <>
            <HeroHome
                badge='New: team workspaces'
                title='The all-in-one platform to run your business'
                description='Manage your work, team and customers in one place. Simple to start, powerful as you grow.'
                actions={
                    <>
                        <Button as={Link} to='/register'>Get started <ArrowRight size={18} /></Button>
                        <Button as={Link} to='/pricing' variant='secondary'>View pricing</Button>
                    </>
                }
            />
            <section className='section-features pt-120'>
                <div className='container'>
                    <div className='section-inner'>
                        <div className='section-head'>
                            <span className='eyebrow'>Features</span>
                            <h2>Everything you need to get work done</h2>
                            <p>All the tools your team needs, in one simple and secure platform.</p>
                        </div>
                        <div className='features-wrapper'>
                            {features.map((item) => (
                                <div className='feature-item' key={item.title}>
                                    <div className='icon-wrapper'>
                                        <item.icon size={22} />
                                    </div>
                                    <h5>{item.title}</h5>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className='section-steps pt-120'>
                <div className='container'>
                    <div className='section-inner'>
                        <div className='section-head'>
                            <span className='eyebrow'>How it works</span>
                            <h2>Get started in three simple steps</h2>
                        </div>
                        <div className='steps-wrapper'>
                            {steps.map((item, index) => (
                                <div className='step-item' key={item.title}>
                                    <span className='step-number'>{index + 1}</span>
                                    <h5>{item.title}</h5>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
            <section className='section-faq pt-120'>
                <div className='container'>
                    <div className='section-inner'>
                        <div className='section-head'>
                            <span className='eyebrow'>FAQ</span>
                            <h2>Frequently asked questions</h2>
                        </div>
                        <Accordion items={faqItems} />
                    </div>
                </div>
            </section>
            <section className='section-cta pt-120 pb-120'>
                <div className='container'>
                    <div className='section-inner'>
                        <h2>Ready to get started?</h2>
                        <p>Create your account and try all features free for 14 days.</p>
                        <div className='actions-wrapper'>
                            <Button as={Link} to='/register'>Get started <ArrowRight size={18} /></Button>
                            <Button as={Link} to='/contact' variant='secondary'>Contact us</Button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
