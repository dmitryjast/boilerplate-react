import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';

import './About.scss';

import { Handshake, Lightbulb, Target } from 'lucide-react';

const values = [
    {
        icon: Target,
        title: 'Focus on customers',
        text: 'Every feature starts with a real problem our customers face.'
    },
    {
        icon: Lightbulb,
        title: 'Keep it simple',
        text: 'Powerful tools do not have to be complicated to use.'
    },
    {
        icon: Handshake,
        title: 'Build trust',
        text: 'We are open about how we work and how we handle your data.'
    }
]

export default function About() {

    const title = 'About Us';

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
            <section className='section-about-story pt-60'>
                <div className='container'>
                    <div className='section-inner'>
                        <h2>Our story</h2>
                        <p>We started with a simple idea: running a business should not require a dozen different tools. Today our platform helps teams of all sizes manage their work, customers and growth in one place.</p>
                        <p>We are a small, remote team that cares about clean design, reliable software and honest support.</p>
                    </div>
                </div>
            </section>
            <section className='section-about-values pt-120 pb-120'>
                <div className='container'>
                    <div className='section-inner'>
                        <h2>Our values</h2>
                        <div className='values-wrapper'>
                            {values.map((item) => (
                                <div className='value-item' key={item.title}>
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
        </>
    )
}
