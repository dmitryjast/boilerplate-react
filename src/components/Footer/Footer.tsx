import { Link } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import FooterList from './FooterList';

import './Footer.scss';

export default function Footer() {

    return(
        <footer className='footer'>
            <div className='container'>
                <div className='footer-inner'>
                    <div className='row-top'>
                        <div className='column'>
                            <Link to='/' className='logo'>
                                <img src={logo} alt='Logo' />
                            </Link>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                        </div>
                        <div className='column'>
                            <FooterList title='Navigation' items={[
                                {label: 'Home', to: '/'},
                                {label: 'About Us', to: '/about-us' },
                                {label: 'Services', to: '/services' },
                                {label: 'Contacts', to: '/contacts' }
                            ]}/>
                        </div>
                        <div className='column'>
                            <FooterList title='Contact Information' items={[
                                {label: 'Demo Company Ltd'},
                                {label: '+44 20 7946 0000', link: 'tel:+442079460000'},
                                {label: 'demo@democompany.example', link: 'mailto:demo@democompany.example'},
                                {label: '123 Demo Street, Demo City, DC1 2AB, United Kingdom'}
                            ]} />
                        </div>
                    </div>
                    <div className='row-bottom'>
                        <div className='column'>
                            <p>© {new Date().getFullYear()} React Boilerplate. All Rights Reserved.</p>
                        </div>
                        <div className='column'>
                            <div className='legal-pages-menu'>
                                <ul>
                                    <li>
                                        <Link to='/privacy-policy'>Privacy Policy</Link>
                                    </li>
                                    <li>
                                        <Link to='/cookies-policy'>Cookies Policy</Link>
                                    </li>
                                    <li>
                                        <Link to='/terms-and-conditions'>Terms and Conditions</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}