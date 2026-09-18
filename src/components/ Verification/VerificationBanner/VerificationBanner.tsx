import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { authApi } from '../../../api/auth/auth.api'
import Button from '../../ui/Button/Button'

import './VerificationBanner.scss'

export default function VerificationBanner() {

    const { user } = useAuth()
    const [sent, setSent] = useState(false)
    const [isOpen, setIsOpen] = useState(true)

    const handleSend = async () => {
        try {
            await authApi.sendVerification()
            setSent(true)
        } catch (err) {
            console.error(err)
        }
    }

    if (!user || user.verifiedAt) return null

    return (
        <div className={`verification-banner ${isOpen ? 'isopen' : 'closing'}`}>
            <div className='banner-inner'>
                <button className='banner-close' onClick={() => setIsOpen(false)}>✕</button>
                <p className='banner-title'>Verification</p>
                <p>Please verify your email to unlock all application features.<br />We'll send you a verification email.</p>
                <Button
                    variant={sent ? 'sent' : 'verify'}
                    onClick={handleSend}
                    disabled={sent}
                >
                    {sent ? 'Sent, check your email' : 'Send verification email'}
                </Button>
            </div>
        </div>
    )
}