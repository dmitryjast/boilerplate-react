import { useState } from 'react'
import { useAuth } from '../../../context/AuthContext'
import { authApi } from '../../../api/auth/auth.api'
import Banner from '../../ui/Banner/Banner'
import Button from '../../ui/Button/Button'

import './VerificationBanner.scss'

import { MailCheck } from 'lucide-react'

export default function VerificationBanner() {

    const { user } = useAuth()
    const [sent, setSent] = useState(false)
    const [isOpen, setIsOpen] = useState(true)
    const [sending, setSending] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const handleSend = async () => {
        setSending(true)
        setError(null)
        try {
            await authApi.sendVerification()
            setSent(true)
        } catch (err) {
            console.error(err)
            setError('Could not send the email. Please try again.')
        } finally {
            setSending(false)
        }
    }

    if (!user || user.verifiedAt) return null

    return (
        <Banner isOpen={isOpen} onClose={() => setIsOpen(false)} className='verification-banner'>
            <div className='banner-inner'>
                <div className='banner-text'>
                    <MailCheck size={32} />
                    <p className='banner-title'>Verification</p>
                    <p>Please verify your email to unlock all application features. We'll send you a verification email.</p>
                    {error && <p className='error-message'>{error}</p>}
                </div>
                <Button
                    variant={sent ? 'sent' : 'verify'}
                    onClick={handleSend}
                    disabled={sent || sending}
                >
                    {sent ? 'Sent, check your email' : sending ? 'Sending...' : 'Send verification email'}
                </Button>
            </div>
        </Banner>
    )
}