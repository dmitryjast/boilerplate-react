import type { ReactNode } from 'react'
import './Banner.scss'

import { X } from 'lucide-react'

interface BannerProps {
    children?: ReactNode;
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
}

// Positioned by BannerStack, which places banners in a screen corner
export default function Banner({children, className, isOpen, onClose}: BannerProps) {

    return(
        <div className={`banner ${isOpen ? 'isopen' : ''} ${className ?? ''}`}>
            {onClose && (
                <button
                    type='button'
                    className='banner-close'
                    aria-label='Close banner'
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
            )}
            {children}
        </div>
    )
}
