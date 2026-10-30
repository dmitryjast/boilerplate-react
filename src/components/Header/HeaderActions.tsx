import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

import HeaderMobileMenu from './HeaderMobileMenu'
import Button from '../ui/Button/Button'

export default function HeaderActions() {

    const { user } = useAuth()

    const actions = user ? (
        <Button as={Link} to='/dashboard'>Go to Dashboard</Button>
    ) : (
        <>
            <Link to='/login'>Sign In</Link>
            <Button as={Link} to='/register'>Sign Up</Button>
        </>
    )

    return(
        <div className='header-actions'>
            <div className='header-actions-desktop'>
                {actions}
            </div>
            <HeaderMobileMenu>
                {actions}
            </HeaderMobileMenu>
        </div>
    )
}