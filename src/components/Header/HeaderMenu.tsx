import { Link } from 'react-router-dom'

export default function HeaderMenu() {
    return (
        <div className='header-menu'>
            <ul>
                <li><Link to='/features'>Features</Link></li>
                <li><Link to='/pricing'>Pricing</Link></li>
                <li><Link to='/about-us'>About</Link></li>
                <li><Link to='/contact'>Contact</Link></li>
            </ul>
        </div>
    )
}