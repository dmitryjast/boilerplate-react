import { useState } from 'react'

import Button from '../ui/Button/Button'
import CheckBox from '../ui/CheckBox/CheckBox'

import { useCookieConsent, type ConsentChoice } from '../../context/CookieConsentContext'
import { COOKIE_CATEGORIES } from '../../data/constants'

export default function CookiesOptions() {

    const { consent, saveConsent } = useCookieConsent()
    const [choice, setChoice] = useState<ConsentChoice>({
        analytics: consent?.analytics ?? false,
        marketing: consent?.marketing ?? false,
    })

    return(
        <div className='categories'>
            <div className='category'>
                <CheckBox label='Essential' checked disabled readOnly />
                <p>Required for the website to work: authentication, security and saving your cookie choice. Always on.</p>
            </div>
            {COOKIE_CATEGORIES.map((category) => (
                <div className='category' key={category.key}>
                    <CheckBox
                        label={category.label}
                        checked={choice[category.key]}
                        onChange={() => setChoice((prev) => ({ ...prev, [category.key]: !prev[category.key] }))}
                    />
                    <p>{category.description}</p>
                </div>
            ))}
            <Button type='button' onClick={() => saveConsent(choice)}>Save my choice</Button>
        </div>
    )
}
