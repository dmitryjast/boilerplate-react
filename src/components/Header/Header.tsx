import { Link, useNavigate } from 'react-router-dom';

import Logo from './Logo';
import HeaderMenu from './HeaderMenu';
import HeaderActions from './HeaderActions';

import './Header.scss';

export default function Header() {
    return(
        <header className='header'>
            <div className='container'>
                <div className='header-inner'>
                    <Logo />
                    <HeaderMenu />
                    <HeaderActions />
                </div>
            </div>
        </header>
        )
}