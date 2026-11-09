import type { ReactNode } from 'react'
import './Banner.scss'

import { X } from 'lucide-react'

type BannerVertical = 'top' | 'bottom'
type BannerHorizontal = 'left' | 'center' | 'right'

interface BannerProps {
    children?: ReactNode;
    className?: string;
    isOpen: boolean;
    onClose?: () => void;
    position?: `${BannerVertical}-${BannerHorizontal}`;
}

export default function Banner({children, className, isOpen, onClose, position = 'bottom-left'}: BannerProps) {

    return(
        <div className={`banner banner-${position} ${isOpen ? 'isopen' : ''} ${className ?? ''}`}>
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
