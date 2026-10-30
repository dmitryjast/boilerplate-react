import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'

import Logo from './Logo'
import HeaderMenu from './HeaderMenu'

import { Menu, X } from 'lucide-react'

interface HeaderMobileMenuProps {
    children?: ReactNode;
}

export default function HeaderMobileMenu({ children }: HeaderMobileMenuProps) {

    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        if(!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape') setIsOpen(false)
        }

        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen])

    const handlePanelClick = (e: MouseEvent) => {
        if((e.target as HTMLElement).closest('a')) setIsOpen(false)
    }

    return(
        <div className='header-mobile-menu'>
            <button
                type='button'
                className='mobile-menu-toggle'
                aria-label='Open menu'
                aria-expanded={isOpen}
                onClick={() => setIsOpen(true)}
            >
                <Menu size={24} />
            </button>
            <div className={`mobile-menu ${isOpen ? 'isopen' : ''}`}>
                <div className='mobile-menu-overlay' onClick={() => setIsOpen(false)} />
                <div className='mobile-menu-panel' onClick={handlePanelClick}>
                    <div className='mobile-menu-top'>
                        <Logo />
                        <button
                            type='button'
                            className='mobile-menu-close'
                            aria-label='Close menu'
                            onClick={() => setIsOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <HeaderMenu />
                    {children && (
                        <div className='mobile-menu-actions'>
                            {children}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}