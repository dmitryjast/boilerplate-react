import type { ReactNode } from "react";

import ErrorMessage from "../../ErrorMessage/ErrorMessage";

import "./Input.scss"

interface InputProps {
    type?: 'text';
    disabled?: boolean;
    className?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    errorMessage?: string;
    [key: string]: any;
}

export default function Input({ type, disabled, className, id, label, placeholder, errorMessage, ...props }: InputProps) {
    return(
        <div className={`input-wrapper ${errorMessage ? "error" : ""}`}>
            {label && (
                <label htmlFor={id} className="input-label">{label}</label>  
            )}
            <input
                id={id}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                className={`input ${className}`} 
                {...props}
            />
            <ErrorMessage message={errorMessage} />
        </div>
    )
}