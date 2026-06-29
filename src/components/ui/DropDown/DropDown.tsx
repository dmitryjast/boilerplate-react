import { useEffect, useRef, useState, type ReactNode } from "react";

import { Link } from "react-router-dom"

import "./DropDown.scss"

interface DropDownItems {
    label: string;
    to?: string;
    link?: string;
    onClick?: () => void;
}

interface DropDownProps {
    label: ReactNode;
    items: DropDownItems[];
    align: 'left' | 'right';
}

export default function DropDown({ label, items, align = "left" }: DropDownProps) {

    const [open, setOpen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        function dropdownTrigger(event: MouseEvent) {
            if(dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false)
            }
        }
        document.addEventListener("mousedown", dropdownTrigger)
        return () => document.removeEventListener("mousedown", dropdownTrigger)
    }, [])

    return(
        <div ref={dropdownRef} className={`dropdown ${open ? 'active' : ''} align-${align}`}>
            <div 
                className="dropdown-trigger"
                onClick={() => setOpen((prev) => !prev)}
            >{label}</div>
            <div className="dropdown-menu">
                <div className="dropdown-menu-inner">
                    <ul>
                        {items?.map((item, index) => (
                            <li key={index}>
                                {item.to ? (
                                    <Link to={item.to}>{item.label}</Link>
                                ) : item.link ? (
                                    <a href={item.link}>{item.label}</a>
                                ) : (
                                    <button onClick={() => { item.onClick?.(); setOpen(false) }}>{item.label}</button>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}