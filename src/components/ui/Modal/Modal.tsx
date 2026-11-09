import { useEffect, type ReactNode } from 'react'
import './Modal.scss'

import { X } from 'lucide-react'

interface ModalProps {
    children?: ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({children, className, isOpen, onClose}: ModalProps) {

    useEffect(() => {
        if(!isOpen) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if(e.key === 'Escape') onClose()
        }

        document.body.style.overflow = 'hidden'
        document.addEventListener('keydown', handleKeyDown)

        return () => {
            document.body.style.overflow = ''
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [isOpen, onClose])

    return(
        <div className={`modal ${isOpen ? 'isopen' : ''} ${className ?? ''}`}>
            <div className='modal-overlay' onClick={onClose} />
            <div className='modal-dialog' role='dialog' aria-modal='true'>
                <button
                    type='button'
                    className='modal-close'
                    aria-label='Close modal'
                    onClick={onClose}
                >
                    <X size={20} />
                </button>
                {children}
            </div>
        </div>
    )
}
