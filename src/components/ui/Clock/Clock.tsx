import { useEffect, useState } from 'react';

import './Clock.scss';

interface ClockProps {
    locale?: string;
    className?: string;
}

export default function Clock({ locale = 'en-US', className }: ClockProps) {

    const [now, setNow] = useState(() => new Date())

    useEffect(() => {
        const interval = setInterval(() => setNow(new Date()), 1000)
        return () => clearInterval(interval)
    }, [])

    const time = now.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
    const date = now.toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <time className={`clock ${className ?? ''}`} dateTime={now.toISOString()}>
            <span className='clock-time'>{time}</span>
            <span className='clock-date'>{date}</span>
        </time>
    )
}
