import type { ComponentProps } from 'react';

import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import './TextArea.scss';

interface TextareaProps extends ComponentProps<'textarea'> {
    label?: string;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    errorMessage?: string;
}


export default function TextArea({ disabled, className, id, label, placeholder, resize = 'none', errorMessage, ...props }: TextareaProps ) {
    return(
        <div className={`input-wrapper ${errorMessage ? 'error' : ''}`}>
            {label && (
                <label htmlFor={id} className='input-label'>{label}</label>  
            )}
            <textarea 
                id={id}
                placeholder={placeholder}
                disabled={disabled}
                className={`input ${className ?? ''}`} 
                style={{resize}}
                {...props}
                />
            <ErrorMessage message={errorMessage} />
        </div>
    )
}