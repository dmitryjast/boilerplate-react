import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext'
import { authApi } from '../../../api/auth/auth.api'
import Button from '../../ui/Button/Button';

import './VerificationCheckout.scss';

export default function VerificationCheckout() {

    const { user } = useAuth()
    const [sent, setSent] = useState(false) 

    const handleSend = async () => {
        try {
            await authApi.sendVerification()
            setSent(true)
        } catch (err) {
            console.error(err)
        }
    }

    if (!user || user.verifiedAt) return null

    return(
        <div className='verification-form'>
            <div className='form-inner'>
                <div className='column-left'>
                    <span>Please verify your email address to unlock full application functionality.</span>
                </div>
                <div className='column-right'>
                    <Button
                        variant='checkout'
                        onClick={handleSend}
                        disabled={sent}
                    >{sent ? 'Sent, check your email' : 'Send verification email'}</Button>
                </div>
            </div>
        </div>
    )
}