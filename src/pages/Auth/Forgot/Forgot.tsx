import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { authApi } from '../../../api/auth/auth.api'
import { forgotSchema, type ForgotFormData } from '../../../schemas/forgot.schema'

import HeroPage from '../../../components/Hero/HeroPage'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import Input from '../../../components/ui/Input/Input'
import Button from '../../../components/ui/Button/Button'

import './Forgot.scss'

export default function Forgot() {

    const title = 'Forgot Password'
    const [sent, setSent] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotFormData>({
        resolver: zodResolver(forgotSchema)
    })

    const onSubmit = async (data: ForgotFormData) => {
        setServerError(null)
        try {
            await authApi.forgotPassword(data)
            setSent(true)
        } catch {
            setServerError('Something went wrong. Please try again.')
        }
    }

    return(
        <>
            <HeroPage title={title} />
            <Breadcrumbs items={[
                { label: 'Home', link: '/' },
                { label: title },
            ]} />

            <section className='section-forgot pt-60 pb-120'>
                <div className="container">
                    <div className="section-inner">
                        {sent ? (
                            <p>If this email exists, you will receive a reset link. Please check your inbox.</p>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email"
                                    autoComplete="email"
                                    errorMessage={errors.email?.message}
                                    {...register('email')}
                                />
                                {serverError && <p className='error-message'>{serverError}</p>}
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                </Button>
                            </form>
                        )}
                        <p className='auth-switch'>Remember your password? <Link to='/login'>Sign in</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}