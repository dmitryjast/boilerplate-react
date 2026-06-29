import ErrorMessage from "../../ErrorMessage/ErrorMessage";

import "./TextArea.scss";

interface TextareaProps {
    disabled?: boolean;
    className?: string;
    id?: string;
    label?: string;
    placeholder?: string;
    resize?: 'none' | 'vertical' | 'horizontal' | 'both';
    errorMessage?: string;
    [key: string]: any;
}


export default function TextArea({ disabled, className, id, label, placeholder, resize = "none", errorMessage, ...props }: TextareaProps ) {
    return(
        <div className={`input-wrapper ${errorMessage ? "error" : ""}`}>
            {label && (
                <label htmlFor={id} className="input-label">{label}</label>  
            )}
            <textarea 
                id={id}
                placeholder={placeholder}
                disabled={disabled}
                className={`input ${className}`} 
                style={{resize}}
                {...props}
                />
            <ErrorMessage message={errorMessage} />
        </div>
    )
}