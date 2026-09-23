import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { authApi } from '../../../api/auth/auth.api'
import { forgotSchema, type ForgotFormData } from '../../../schemas/forgot.schema'

import HeroPage from '../../../components/Hero/HeroPage'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import Input from '../../../components/ui/Input/Input'
import Button from '../../../components/ui/Button/Button'

import heroBackground from '../../../assets/img/demo-background.jpg'
import './Forgot.scss'

export default function Forgot() {

    const title = 'Forgot Password'
    const [sent, setSent] = useState(false)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ForgotFormData>({
        resolver: zodResolver(forgotSchema)
    })

    const onSubmit = async (data: ForgotFormData) => {
        try {
            await authApi.forgotPassword(data)
            setSent(true)
        } catch (error) {
            console.error('Forgot password failed:', error)
        }
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
                        {sent ? (
                            <p>If this email exists, you will receive a reset link. Please check your inbox.</p>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)}>
                                <Input
                                    label="Email"
                                    type="email"
                                    placeholder="Enter your email"
                                    errorMessage={errors.email?.message}
                                    {...register('email')}
                                />
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? 'Sending...' : 'Send Reset Link'}
                                </Button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}