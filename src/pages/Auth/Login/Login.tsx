import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import { authApi } from '../../../api/auth/auth.api'
import { loginSchema, type LoginFormData } from '../../../schemas/login.schema'

import HeroPage from '../../../components/Hero/HeroPage';
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs';
import Input from '../../../components/ui/Input/Input'
import Button from '../../../components/ui/Button/Button'

import heroBackground from '../../../assets/img/demo-background.jpg'
import './Login.scss'

export default function Login() {

    const title = 'Login';
    const navigate = useNavigate()
    const { login } = useAuth()

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema)
    })

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await authApi.login(data)
            login(response.data.accessToken)
            navigate('/')
        } catch (error) {
            console.log('Login failed:', error)
        }
    }

    return(
        <>
            <HeroPage 
                title={title}
                background={heroBackground}    
            />
            <Breadcrumbs 
            items={[
                {label: 'Home', link: '/'},
                {label: title},
            ]} 
            />
            <section>
                <div className="container">
                    <div className="section-inner">
                        <form onSubmit={handleSubmit(onSubmit)}>
                             <Input
                            label="Email"
                            type="email"
                            placeholder="Enter your email"
                            errorMessage={errors.email?.message}
                            {...register('email')}
                            />
                            <Input
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                errorMessage={errors.password?.message}
                                {...register('password')}
                            />
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