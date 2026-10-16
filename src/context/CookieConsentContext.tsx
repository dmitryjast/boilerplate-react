import { createContext, useContext, useState, type ReactNode } from 'react'

export interface ConsentChoice {
    analytics: boolean
    marketing: boolean
}

interface Consent extends ConsentChoice {
    at: number
}

interface CookieConsentContextType {
    consent: Consent | null
    isOpen: boolean
    isManageOpen: boolean
    saveConsent: (choice: ConsentChoice) => void
    openSettings: () => void
    closePopup: () => void
    toggleManage: () => void
}

const STORAGE_KEY = 'cookie_consent'
const CONSENT_LIFETIME = 365 * 24 * 60 * 60 * 1000

const readConsent = (): Consent | null => {
    try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if(!raw) return null

        const consent = JSON.parse(raw)
        const isValid = typeof consent?.analytics === 'boolean'
            && typeof consent?.marketing === 'boolean'
            && typeof consent?.at === 'number'

        if(!isValid || Date.now() - consent.at > CONSENT_LIFETIME) {
            localStorage.removeItem(STORAGE_KEY)
            return null
        }

        return consent
    } catch {
        return null
    }
}

const CookieConsentContext = createContext<CookieConsentContextType | null>(null)

export function CookieConsentProvider({ children }: { children: ReactNode }) {

    const [consent, setConsent] = useState<Consent | null>(readConsent)
    const [isOpen, setIsOpen] = useState(() => consent === null)
    const [isManageOpen, setIsManageOpen] = useState(false)

    const saveConsent = (choice: ConsentChoice) => {
        const value = { ...choice, at: Date.now() }
        setConsent(value)
        setIsOpen(false)
        setIsManageOpen(false)

        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
        } catch (err) {
            console.error(err)
        }
    }

    const openSettings = () => {
        setIsOpen(true)
        setIsManageOpen(true)
    }

    const closePopup = () => {
        setIsOpen(false)
        setIsManageOpen(false)
    }

    const toggleManage = () => {
        setIsManageOpen((prev) => !prev)
    }

    return (
        <CookieConsentContext.Provider value={{ consent, isOpen, isManageOpen, saveConsent, openSettings, closePopup, toggleManage }}>
            {children}
        </CookieConsentContext.Provider>
    )

}

export function useCookieConsent() {
    const context = useContext(CookieConsentContext)

    if(!context) {
        throw new Error('useCookieConsent must be used within CookieConsentProvider')
    }

    return context
}
