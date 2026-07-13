
import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

import './ScrollToTop.scss'

export default function ScrollToTop() {

    const [isVisible, setIsVisible] = useState(false)

    const handleScroll = () => {

        const position = window.scrollY

        if(position >= 200) {
            setIsVisible(true)
        } else {
            setIsVisible(false)
        }
    }

    const scrollToTop = () => {
        window.scrollTo(0, 0)
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)

        return () => {
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    return(
        <button  className={`scroll-to-top ${isVisible ? 'is-visible' : ''}`} onClick={scrollToTop}>
            <ArrowUp size={30} />
        </button>
    )
}