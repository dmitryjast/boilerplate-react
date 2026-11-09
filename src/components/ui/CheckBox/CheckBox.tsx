import type { ComponentProps, ReactNode } from 'react';

import ErrorMessage from '../../ErrorMessage/ErrorMessage';

import './CheckBox.scss'

interface CheckBoxProps extends Omit<ComponentProps<'input'>, 'type'> {
    label: ReactNode;
    errorMessage?: string;
}

export default function CheckBox({ label, className, disabled, errorMessage, ...props }: CheckBoxProps) {
    return(
        <div className={`checkbox-wrapper ${className ?? ''} ${disabled ? 'disabled' : ''} ${errorMessage ? 'error' : ''}`}>
            <label>
                <input
                    type='checkbox'            
                    disabled={disabled}
                    {...props}
                />
                <div className='checkmark-wrapper' />
                {label && <span className='checkbox-label'>{label}</span>}
            </label>
            <ErrorMessage message={errorMessage} />
        </div>
    )
}