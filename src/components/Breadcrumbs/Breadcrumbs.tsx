import { Link } from "react-router-dom"

import "./Breadcrumbs.scss"

interface BreadCrumbstItem {
    label: string;
    to?: string;
    link?: string;
}

interface BreadcrumbsListProps {
    items: BreadCrumbstItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsListProps) {
    return (
        <section className="breadrumbs-section">
            <div className="container">
                <div className="section-inner">
                    <ul>
                        {items?.map((item, index) => (
                            <li key={index}>
                                {item.to? (
                                    <Link to={item.to}>{item.label}</Link>
                                ) : item.link? (
                                    <a href={item.link}>{item.label}</a>
                                ) : (
                                    <p>{item.label}</p>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    )
}