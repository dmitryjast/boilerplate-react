import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authApi } from '../../../api/auth/auth.api'
import { resetPasswordSchema, type ResetPasswordFormData } from '../../../schemas/reset-password.schema'

import HeroPage from '../../../components/Hero/HeroPage'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import Input from '../../../components/ui/Input/Input'
import Button from '../../../components/ui/Button/Button'

import heroBackground from '../../../assets/img/demo-background.jpg'

export default function ResetPassword() {

    const title = 'Reset Password'
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [success, setSuccess] = useState(false)

    const token = searchParams.get('token')
    const userId = searchParams.get('userId')

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ResetPasswordFormData>({
        resolver: zodResolver(resetPasswordSchema)
    })

    const onSubmit = async (data: ResetPasswordFormData) => {
        if(!token || !userId) return

        try {
            await authApi.resetPassword({
                userId: Number(userId),
                token,
                newPassword: data.password,
            })
            setSuccess(true)
            setTimeout(() => navigate('/login'), 3000)
        } catch (error) {
            console.error('Reset password failed:', error)
        }
    }

    if(!token || !userId) {
        return <p>Invalid reset link.</p>
    }

    return(
        <>
            <HeroPage title={title} background={heroBackground} />
            <Breadcrumbs items={[
                { label: 'Home', link: '/' },
                { label: title },
            ]} />

            <section>
                <div className="container">
                    <div className="section-inner">
                        {success ? (
                            <p>Password successfully reset! Redirecting to login...</p>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    label="New Password"
                                    type="password"
                                    placeholder="Enter new password"
                                    errorMessage={errors.password?.message}
                                    {...register('password')}
                                />
                                <Input
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="Confirm new password"
                                    errorMessage={errors.confirmPassword?.message}
                                    {...register('confirmPassword')}
                                />
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