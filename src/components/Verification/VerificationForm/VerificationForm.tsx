import { useState, useRef, useEffect } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { authApi } from '../../../api/auth/auth.api'
import Button from '../../ui/Button/Button'

import './VerificationForm.scss'

export default function VerificationForm() {

    const { user, refreshUser } = useAuth()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()

    const token = searchParams.get('token')
    const userId = searchParams.get('userId')

    const [sent, setSent] = useState(false)
    const [code, setCode] = useState(['', '', '', '', '', ''])
    const [error, setError] = useState<string | null>(null)
    const [verified, setVerified] = useState(false)
    const [resendCooldown, setResendCooldown] = useState(0)
    const [checking, setChecking] = useState(false)
    const inputsRef = useRef<(HTMLInputElement | null)[]>([])

    // Auto verify by link
    useEffect(() => {
        if(token && userId) {
            handleVerifyByToken()
        }
    }, [])

    // Focus first input when form appears
    useEffect(() => {
        if(sent) {
            inputsRef.current[0]?.focus()
        }
    }, [sent])

    // Resend cooldown timer
    useEffect(() => {
        if(resendCooldown <= 0) return
        const timeout = setTimeout(() => setResendCooldown((prev) => prev - 1), 1000)
        return () => clearTimeout(timeout)
    }, [resendCooldown])

    const formatCooldown = (totalSeconds: number) => {
        const minutes = Math.floor(totalSeconds / 60)
        const seconds = totalSeconds % 60
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }

    const handleVerifyByToken = async () => {
        setChecking(true)
        setError(null)
        try {
            await authApi.verifyEmail({
                userId: Number(userId),
                tokenOrCode: token!,
            })
            setVerified(true)
            await refreshUser()
            setTimeout(() => navigate('/'), 3000)
        } catch {
            setError('Link expired or invalid. Please request a new verification email.')
        } finally {
            setChecking(false)
        }
    }

    const handleSend = async () => {
        setError(null)
        try {
            await authApi.sendVerification()
            setSent(true)
        } catch (err) {
            console.error(err)
        }
    }

    const handleResend = async () => {
        setError(null)
        try {
            await authApi.sendVerification()
            setCode(['', '', '', '', '', ''])
            setResendCooldown(59)
        } catch (err) {
            console.error(err)
        }
    }

    const handleCodeChange = (index: number, value: string) => {
        const digit = value.replace(/[^0-9A-Za-z]/g, '')
        const newCode = [...code]
        newCode[index] = digit
        setCode(newCode)
        if(digit && index < 5) {
            inputsRef.current[index + 1]?.focus()
        }
    }

    const handleCodeKeyDown = (index: number, e: React.KeyboardEvent) => {
        if(e.key === 'Backspace' && !code[index] && index > 0) {
            inputsRef.current[index - 1]?.focus()
        }
    }

    const handleCodePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()
        const pasted = e.clipboardData.getData('text').replace(/[^0-9A-Za-z]/g, '').slice(0, 6)
        if(!pasted) return
        const newCode = [...code]
        pasted.split('').forEach((char, i) => { newCode[i] = char })
        setCode(newCode)
        inputsRef.current[Math.min(pasted.length, 5)]?.focus()
    }

    const handleCheck = async () => {
        setError(null)
        setChecking(true)
        try {
            await authApi.verifyEmail({
                userId: user!.id,
                tokenOrCode: code.join(''),
            })
            setVerified(true)
            await refreshUser()
        } catch {
            setError('Invalid or expired code. Please try again.')
        } finally {
            setChecking(false)
        }
    }

    return (
        <div className='verification-form'>
            {/* Auto verify by link */}
            {token && userId ? (
                checking ? (
                    <p>Verifying your email...</p>
                ) : verified ? (
                    <p>✅ Email verified successfully! Redirecting in 3 seconds...</p>
                ) : error ? (
                    <>
                        <p className='code-error'>{error}</p>
                        <Button onClick={handleSend} disabled={sent}>
                            {sent ? 'Sent, check your email' : 'Send new verification email'}
                        </Button>
                    </>
                ) : null
            ) : !user ? (
                <p>Please log in to verify your email.</p>
            ) : user.verifiedAt && !verified ? (
                <p>✅ Your email is already verified!</p>
            ) : verified ? (
                <p>✅ Email verified successfully!</p>
            ) : (
                <>
                    <div className='column-left'>
                        <span>Please verify your email address to unlock full application functionality.</span>
                    </div>
                    <div className='column-right'>
                        {!sent ? (
                            <Button variant='checkout' onClick={handleSend}>
                                Send verification email
                            </Button>
                        ) : (
                            <>
                                <p>Code sent! Check your email.</p>
                                <div className='code-inputs'>
                                    {code.map((digit, i) => (
                                        <input
                                            key={i}
                                            type='text'
                                            inputMode='numeric'
                                            autoComplete='one-time-code'
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleCodeChange(i, e.target.value)}
                                            onKeyDown={(e) => handleCodeKeyDown(i, e)}
                                            onPaste={handleCodePaste}
                                            ref={(el) => (inputsRef.current[i] = el)}
                                            className='code-input'
                                        />
                                    ))}
                                </div>
                                {error && <p className='code-error'>{error}</p>}
                                <div className='actions'>
                                    <Button
                                        type='button'
                                        onClick={handleCheck}
                                        disabled={code.some((d) => !d) || checking}
                                    >
                                        {checking ? 'Verifying...' : 'Verify email'}
                                    </Button>
                                    <Button
                                        type='button'
                                        variant='secondary'
                                        onClick={handleResend}
                                        disabled={resendCooldown > 0}
                                    >
                                        {resendCooldown > 0 ? `Resend (${formatCooldown(resendCooldown)})` : 'Resend'}
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </div>
    )
}