import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { authApi } from '../../../api/auth/auth.api'
import { loginSchema, type LoginFormData } from '../../../schemas/login.schema'

import HeroPage from '../../../components/Hero/HeroPage'
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import Input from '../../../components/ui/Input/Input'
import Button from '../../../components/ui/Button/Button'

import heroBackground from '../../../assets/img/demo-background.jpg'
import './Login.scss'

export default function Login() {

    const title = 'Login'
    const navigate = useNavigate()
    const { login } = useAuth()
    const [serverError, setServerError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormData) => {
        setServerError(null)
        try {
            const response = await authApi.login(data)
            await login(response.data.accessToken)
            navigate('/')
        } catch (error: any) {
            if(error.response?.status === 401) {
                setServerError('Invalid email or password.')
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
                                autoComplete="current-password"
                                errorMessage={errors.password?.message}
                                {...register('password')}
                            />
                            {serverError && <p className='error-message'>{serverError}</p>}
                            <Button type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Logging in...' : 'Login'}
                            </Button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    )
}