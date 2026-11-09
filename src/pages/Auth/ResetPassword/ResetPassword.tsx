import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { isAxiosError } from 'axios'
import { authApi } from '../../../api/auth/auth.api'
import { resetPasswordSchema, type ResetPasswordFormData } from '../../../schemas/reset-password.schema'

import HeroPage from '../../../components/Hero/HeroPage'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import Input from '../../../components/ui/Input/Input'
import Button from '../../../components/ui/Button/Button'

import './ResetPassword.scss'

export default function ResetPassword() {

    const title = 'Reset Password'
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [success, setSuccess] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const token = searchParams.get('token')
    const userId = searchParams.get('userId')
    const isValidLink = !!token && /^\d+$/.test(userId ?? '')

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema)
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        if(!token || !userId) return
        setServerError(null)

        try {
            await authApi.resetPassword({
                userId: Number(userId),
                token,
                newPassword: data.password,
            })
            setSuccess(true)
            setTimeout(() => navigate('/login'), 3000)
        } catch (error) {
            if(isAxiosError(error) && error.response?.status === 401) {
                setServerError('Reset link expired or invalid. Please request a new one.')
            } else {
                setServerError('Something went wrong. Please try again.')
            }
        }
    }

    return(
        <>
            <HeroPage title={title} />
            <Breadcrumbs items={[
                { label: 'Home', link: '/' },
                { label: title },
            ]} />

            <section className='section-reset-password pt-60 pb-120'>
                <div className="container">
                    <div className="section-inner">
                        {!isValidLink ? (
                            <p>Invalid reset link. <Link to='/forgot'>Request a new one</Link></p>
                        ) : success ? (
                            <p>Password successfully reset! Redirecting to login...</p>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    label="New Password"
                                    type="password"
                                    placeholder="Enter new password"
                                    autoComplete="new-password"
                                    errorMessage={errors.password?.message}
                                    {...register('password')}
                                />
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm new password"
                                    autoComplete="new-password"
                                    errorMessage={errors.confirmPassword?.message}
                                    {...register('confirmPassword')}
                                />
                                {serverError && <p className='error-message'>{serverError}</p>}
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Resetting...' : 'Reset Password'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}