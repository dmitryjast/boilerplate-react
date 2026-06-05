import { Link } from "react-router-dom"

interface FooterListItem {
    label: string;
    to?: string;
    link?: string;
}

interface FooterListProps {
    title: string;
    items: FooterListItem[];
}

export default function FooterList({ title, items }: FooterListProps) {

    return(
        <div className="footer-list">
            <h5>{title}</h5>
            <div>
                <ul>
                    {items.map((item, index) => (
                        <li key={index}>
                             {item.to ? (
                                <Link to={item.to}>{item.label}</Link>
                             ) : item.link ? (
                                <a href={item.link}>{item.label}</a>
                             ) : (
                                <p>{item.label}</p>
                             )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}