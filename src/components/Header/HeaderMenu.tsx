import { Link } from 'react-router-dom'

export default function HeaderMenu() {
    return (
        <div className='header-menu'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/about-us'>About Us</Link></li>
                <li><Link to='/services'>Services</Link></li>
                <li><Link to='/Contacts'>Contacts</Link></li>
            </ul>
        </div>
    )
}