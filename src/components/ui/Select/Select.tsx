import type { ComponentProps } from 'react';

import ErrorMessage from '../../ErrorMessage/ErrorMessage'

import './Select.scss'

interface SelectItem {
    label: string;
    value: string;
}

interface SelectProps extends Omit<ComponentProps<'select'>, 'children'> {
    items: SelectItem[];
    label?: string;
    errorMessage?: string;
}

export default function Select({ items, value, disabled, className, id, label, onChange, errorMessage, ...props }: SelectProps) {
    return(
        <div className={`input-wrapper ${errorMessage ? 'error' : ''}`}>
            {label && (
                <label htmlFor={id} className='input-label'>{label}</label>  
            )}
            <select 
                value={value}
                disabled={disabled}
                className={`select ${className ?? ''}`}
                id={id}
                onChange={onChange}
                {...props}
            >
                {items.map((item) => (
                    <option key={item.value} value={item.value}>{item.label}</option>
                ))}
            </select>  
            <ErrorMessage message={errorMessage} />
        </div>
    )
}