import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactApi } from '../../api/contact/contact.api';
import { contactSchema, type ContactFormData } from '../../schemas/contact.schema';

import Input from '../ui/Input/Input';
import TextArea from '../ui/TextArea/TextArea';
import Button from '../ui/Button/Button';

import './ContactForm.scss';

export default function ContactForm() {

    const [sent, setSent] = useState(false)
    const [serverError, setServerError] = useState<string | null>(null)

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema)
    })

    const onSubmit = async (data: ContactFormData) => {
        setServerError(null)
        try {
            await contactApi.send(data)
            setSent(true)
        } catch {
            setServerError('Something went wrong. Please try again.')
        }
    }

    return (
        <div className='contact-form'>
            {sent ? (
                <div className='form-success'>
                    <h4>Thank you!</h4>
                    <p>Your message has been sent. We will get back to you soon.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        label='Name'
                        type='text'
                        placeholder='Your name'
                        autoComplete='name'
                        errorMessage={errors.name?.message}
                        {...register('name')}
                    />
                    <Input
                        label='Email'
                        type='email'
                        placeholder='you@example.com'
                        autoComplete='email'
                        errorMessage={errors.email?.message}
                        {...register('email')}
                    />
                    <Input
                        label='Subject'
                        type='text'
                        placeholder='What is it about?'
                        errorMessage={errors.subject?.message}
                        {...register('subject')}
                    />
                    <TextArea
                        label='Message'
                        placeholder='How can we help?'
                        errorMessage={errors.message?.message}
                        {...register('message')}
                    />
                    {serverError && <p className='error-message'>{serverError}</p>}
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Sending...' : 'Send message'}
                    </Button>
                </form>
            )}
        </div>
    )
}
