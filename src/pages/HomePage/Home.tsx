import { Link } from 'react-router-dom';

import HeroHome from '../../components/Hero/HeroHome';
import Button from '../../components/ui/Button/Button';
import Accordion from '../../components/ui/Accordion/Accordion';

import { homeFeaturesData, homeStepsData } from '../../data/homeData';
import { homeFaqData } from '../../data/accordionData';

import './Home.scss';

import { ArrowRight } from 'lucide-react';

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
                            {homeFeaturesData.map((item) => (
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
                            {homeStepsData.map((item, index) => (
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
                        <Accordion items={homeFaqData} />
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
