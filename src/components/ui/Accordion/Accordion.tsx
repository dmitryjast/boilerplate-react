import { useState } from 'react';
import type { ReactNode } from 'react'

import './Accordion.scss'

interface AccordionItem {
    label: string;
    content: ReactNode;
}

interface AccordionItems {
    items: AccordionItem[];
}

export default function Accordion({ items }: AccordionItems) {

    const [activeItem, setActiveItem] = useState<number | null>(null)

    const clickTrigger = (index: number) => {
        setActiveItem(activeItem === index ? null : index)
    }

    return(
        <>
            <div className='accordion'>
                <div className='accordion-inner'>
                    {items.map((item, index) => 
                        <div className={`accordion-item ${activeItem === index ? 'active' : ''}`} key={index}>
                            <div className='title-wrapper' onClick={() => clickTrigger(index)}>
                                <h5>{item.label}</h5>
                                <div className='arrow'></div>
                            </div>
                            <div className='content-wrapper'>
                                <div className='content'>{item.content}</div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}