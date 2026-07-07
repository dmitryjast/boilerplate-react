import { useState } from 'react'

import { Link } from 'react-router-dom'

import Modal from '../ui/Modal/Modal'
import Button from '../ui/Button/Button'

import './CookiesPopup.scss'

import { Cookie, X } from 'lucide-react'

export default function CookiesPopup() {

    const [isOpen, setIsOpen] = useState(true)

    return(
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} className={`cookies-popup ${isOpen ? 'isopen' : ''}`}>
            <div className='content'>
                <div className='row-top'>
                    <Cookie size={60} color='#000' />
                </div>
                <div className='row-bottom'>
                    <p>
                        We use cookies to improve your experience on our website. 
                        By continuing to browse, you agree to our <Link to='/cookies-policy'>Cookies Policy</Link> and <Link to='/privacy-policy'>Privacy Policy</Link>
                    </p>
                    <Button type='button'>Accept</Button>
                </div>
                <Button type='button' className='deny' onClick={() => setIsOpen(false)}>
                    <X size={24} color="#000" />
                </Button>
            </div>
        </Modal>
    )
}