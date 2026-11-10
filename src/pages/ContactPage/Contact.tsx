import HeroPage from '../../components/Hero/HeroPage';
import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs';
import ContactForm from '../../components/ContactForm/ContactForm';

import './Contact.scss';

import { Mail, MapPin, Phone } from 'lucide-react';

const contacts = [
    { icon: Mail, label: 'Email', value: 'demo@democompany.example', link: 'mailto:demo@democompany.example' },
    { icon: Phone, label: 'Phone', value: '+44 20 7946 0000', link: 'tel:+442079460000' },
    { icon: MapPin, label: 'Office', value: '123 Demo Street, Demo City, DC1 2AB, United Kingdom' }
]

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
            <section className='section-contact pt-60 pb-120'>
                <div className='container'>
                    <div className='section-inner'>
                        <div className='column-info'>
                            <h2>Get in touch</h2>
                            <p>Have a question or need help? Send us a message and we will get back to you within one business day.</p>
                            <ul>
                                {contacts.map((item) => (
                                    <li key={item.label}>
                                        <div className='icon-wrapper'>
                                            <item.icon size={20} />
                                        </div>
                                        <div className='text-wrapper'>
                                            <span>{item.label}</span>
                                            {item.link ? (
                                                <a href={item.link}>{item.value}</a>
                                            ) : (
                                                <p>{item.value}</p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </>
    )
}
