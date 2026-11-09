import type { ComponentProps } from 'react';

import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import './Input.scss';

interface InputProps extends Omit<ComponentProps<'input'>, 'type'> {
    type?: 'text' | 'email' | 'password' | 'number' | 'tel';
    label?: string;
    errorMessage?: string;
}

export default function Input({ type, disabled, className, id, label, placeholder, errorMessage, ...props }: InputProps) {
    return(
        <div className={`input-wrapper ${errorMessage ? 'error' : ''}`}>
            {label && (
                <label htmlFor={id} className='input-label'>{label}</label>  
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`input ${className ?? ''}`} 
                {...props}
            />
            <ErrorMessage message={errorMessage} />
        </div>
    )
}