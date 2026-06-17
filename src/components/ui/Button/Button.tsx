import type { ElementType, MouseEventHandler, ReactNode } from "react";

import "./Button.scss"

interface ButtonProps {
    children: ReactNode;
    as?: ElementType;
    to?: string;
    type?: "button" | "submit" | "reset";
    className?: string;
    variant?: string;
    disabled?: boolean;
    onClick?: MouseEventHandler;
    [key: string]: any;
}

export default function Button({ 
    children, 
    as: Element = 'button', 
    to, 
    type="submit", 
    className="button", 
    variant="primary", 
    disabled=false, 
    onClick, 
    ...props }: ButtonProps) {

    const isButton = Element === "button"

    return(
        <Element 
            type={isButton ? type : undefined}
            disabled={isButton ? disabled : undefined}
            to={!isButton ? to : undefined}
            className={`${className} btn-${variant}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </Element>
    )
}