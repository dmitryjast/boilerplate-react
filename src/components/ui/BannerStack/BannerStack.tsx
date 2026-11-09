import type { ReactNode } from 'react'
import './BannerStack.scss'

type StackVertical = 'top' | 'bottom'
type StackHorizontal = 'left' | 'right'

interface BannerStackProps {
    children?: ReactNode;
    position?: `${StackVertical}-${StackHorizontal}`;
}

// Stacks several banners in one corner: when one closes, the others move into its place
export default function BannerStack({children, position = 'bottom-left'}: BannerStackProps) {

    return(
        <div className={`banner-stack banner-stack-${position}`}>
            {children}
        </div>
    )
}
