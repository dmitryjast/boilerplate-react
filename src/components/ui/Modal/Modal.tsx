import type { ReactNode } from 'react'
import './Modal.scss'

interface ModalProps {
    children?: ReactNode;
    className?: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function Modal({children, className}: ModalProps) {

    return(
        <div className={`modal ${className}`}>
            {children}
        </div>
    )
}