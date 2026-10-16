import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { authApi } from '../../../api/auth/auth.api'
import { registerSchema, type RegisterFormData } from '../../../schemas/register.schema'

import HeroPage from '../../../components/Hero/HeroPage'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import Input from '../../../components/ui/Input/Input'
import Button from '../../../components/ui/Button/Button'

import heroBackground from '../../../assets/img/demo-background.jpg'
import './Register.scss'

export default function Register() {

    const title = 'Register'
    const navigate = useNavigate()
    const { login } = useAuth()
    const [serverError, setServerError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema)
    })

    const onSubmit = async (data: RegisterFormData) => {
        setServerError(null)
        try {
            const response = await authApi.register({
                name: data.name,
                email: data.email,
                password: data.password,
            })
            await login(response.data.accessToken)
            navigate('/')
        } catch (error: any) {
            if(error.response?.status === 409) {
                setServerError('User with this email already exists.')
            } else {
                setServerError('Something went wrong. Please try again.')
            }
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
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <Input
                                label="Name"
                                type="text"
                                placeholder="Enter your name"
                                autoComplete="name"
                                errorMessage={errors.name?.message}
                                {...register('name')}
                            />
                            <Input
                                label="Email"
                                type="email"
                                placeholder="Enter your email"
                                autoComplete="email"
                                errorMessage={errors.email?.message}
                                {...register('email')}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                autoComplete="new-password"
                                errorMessage={errors.password?.message}
                                {...register('password')}
                            />
                            <Input
                                label="Confirm Password"
                                type="password"
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                                errorMessage={errors.confirmPassword?.message}
                                {...register('confirmPassword')}
                            />
                            {serverError && <p className='error-message'>{serverError}</p>}
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Registering...' : 'Register'}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}