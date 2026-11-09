import type { ComponentProps, ElementType, ReactNode } from 'react';

import './Button.scss'

type ButtonProps<T extends ElementType = 'button'> = {
    children: ReactNode;
    as?: T;
    className?: string;
    variant?: string;
} & Omit<ComponentProps<T>, 'as' | 'children' | 'className'>

export default function Button<T extends ElementType = 'button'>({ 
    children, 
    as, 
    className='button', 
    variant='primary', 
    ...props }: ButtonProps<T>) {

    const Element: ElementType = as ?? 'button'
    const isButton = Element === 'button'

    return(
        <Element 
            type={isButton ? 'submit' : undefined}
            className={`${className} btn-${variant}`}
            {...props}
        >
            {children}
        </Element>
    )
}