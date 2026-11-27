import './Avatar.scss';

interface AvatarProps {
    name?: string;
    src?: string | null;
    size?: number;
    className?: string;
}

export default function Avatar({ name = '', src, size = 36, className }: AvatarProps) {

    const initials = name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0].toUpperCase())
        .join('');

    return (
        <div
            className={`avatar ${className ?? ''}`}
            style={{ width: size, height: size, fontSize: Math.round(size * 0.4) }}
        >
            {src
                ? <img src={src} alt={name} />
                : initials
            }
        </div>
    )
}
