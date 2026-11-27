import { useEffect, useRef, useState, type ReactNode } from 'react';

import { Link } from 'react-router-dom'

import './DropDown.scss'

interface DropDownItems {
    label: string;
    to?: string;
    link?: string;
    onClick?: () => void;
    icon?: ReactNode;
    divider?: boolean;
    danger?: boolean;
}

interface DropDownProps {
    label: ReactNode;
    items: DropDownItems[];
    align?: 'left' | 'right';
    header?: ReactNode;
    className?: string;
}

export default function DropDown({ label, items, align = 'left', header, className }: DropDownProps) {

    const [isOpen, setIsOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function dropdownTrigger(event: MouseEvent) {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setIsOpen(false)
            }
        }
        document.addEventListener('click', dropdownTrigger)
        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('click', dropdownTrigger)
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return(
        <div ref={dropdownRef} className={`dropdown ${isOpen ? 'active' : ''} align-${align} ${className ?? ''}`}>
            <div
                className='dropdown-trigger'
                onClick={() => setIsOpen((prev) => !prev)}
            >{label}</div>
            <div className='dropdown-menu'>
                <div className='dropdown-menu-inner'>
                    {header && (
                        <div className='dropdown-header'>{header}</div>
                    )}
                    <ul>
                        {items?.map((item, index) => (
                            <li key={index} className={item.divider ? 'divider' : ''}>
                                {item.to ? (
                                    <Link
                                        to={item.to}
                                        className={item.danger ? 'danger' : ''}
                                        onClick={() => setIsOpen(false)}
                                    >{item.icon}{item.label}</Link>
                                ) : item.link ? (
                                    <a
                                        href={item.link}
                                        className={item.danger ? 'danger' : ''}
                                        onClick={() => setIsOpen(false)}
                                    >{item.icon}{item.label}</a>
                                ) : (
                                    <button
                                        type='button'
                                        className={item.danger ? 'danger' : ''}
                                        onClick={() => { item.onClick?.(); setIsOpen(false) }}
                                    >{item.icon}{item.label}</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
