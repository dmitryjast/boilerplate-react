import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom'

import Button from '../ui/Button/Button'

export default function HeaderActions() {

    const { user } = useAuth()


    return(
        <div className='header-actions'>
            {user ? (
                <Button as={Link} to='/dashboard'>Go to Dashboard</Button>
            ) : (
                <>
                    <Link to='/login'>Sign In</Link>
                    <Button as={Link} to='/register'>Sign Up</Button>
                </>
            )}
        </div>
    )
}