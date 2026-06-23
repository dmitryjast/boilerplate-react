import type { ChangeEventHandler } from "react";

import ErrorMessage from "../../ErrorMessage/ErrorMessage"

import "./Select.scss"

interface SelectItem {
    label: string;
    value: string;
}

interface SelectProps {
    value?: string;
    items: SelectItem[];
    disabled?: boolean;
    id?: string;
    className?: string;
    label?: string;
    onChange?: ChangeEventHandler <HTMLSelectElement>;
    errorMessage?: string;
    [key: string]: any;
}

export default function Select({ items, value, disabled, className, id, label, onChange, errorMessage, ...props }: SelectProps) {
    return(
        <div className={`input-wrapper ${errorMessage ? "error" : ""}`}>
            {label && (
                <label htmlFor={id} className="input-label">{label}</label>  
            )}
            <select 
                value={value}
                disabled={disabled}
                className={`select ${className}`}
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