import { Link } from 'react-router-dom'

import Modal from '../ui/Modal/Modal'
import Button from '../ui/Button/Button'
import CookiesOptions from './CookiesOptions'

import { useCookieConsent } from '../../context/CookieConsentContext'

import './CookiesPopup.scss'

import { Cookie, X } from 'lucide-react'

export default function CookiesPopup() {

    const { isOpen, isManageOpen, saveConsent, closePopup, toggleManage } = useCookieConsent()

    const handleAccept = () => {
        saveConsent({ analytics: true, marketing: true })
    }

    const handleDeny = () => {
        saveConsent({ analytics: false, marketing: false })
    }

    return(
        <Modal isOpen={isOpen} onClose={closePopup} className={`cookies-popup ${isOpen ? 'isopen' : ''}`}>
            <div className='content'>
                <div className='row-top'>
                    <Cookie size={60} color='#000' />
                </div>
                <div className='row-bottom'>
                    <p>
                        We use essential cookies to make our website work. With your consent, we also use analytics and marketing cookies.
                        You can change your choice at any time in Cookie Settings. Read our <Link to='/cookies-policy'>Cookies Policy</Link> and <Link to='/privacy-policy'>Privacy Policy</Link>
                    </p>
                    <div className='actions'>
                        <Button type='button' onClick={handleAccept}>Accept</Button>
                        <Button type='button' onClick={handleDeny}>Deny</Button>
                        <Button type='button' onClick={toggleManage}>
                            {isManageOpen ? 'Hide options' : 'Manage'}
                        </Button>
                    </div>
                </div>
                {isManageOpen && <CookiesOptions />}
                <Button type='button' className='close' onClick={closePopup}>
                    <X size={24} color='#000' />
                </Button>
            </div>
        </Modal>
    )
}
