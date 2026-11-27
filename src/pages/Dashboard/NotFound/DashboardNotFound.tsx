import { Link } from 'react-router-dom';
import { SearchX } from 'lucide-react'

import Button from '../../../components/ui/Button/Button';

import { SITE_NAME } from '../../../data/constants';

import './DashboardNotFound.scss';

export default function DashboardNotFound() {

    const title = 'Page Not Found';

    return (
        <>
            <title>{`${title} | ${SITE_NAME}`}</title>
            <div className='section-dashboard-not-found'>
                <div className='not-found-icon'>
                    <SearchX size={24} />
                </div>
                <h2>{title}</h2>
                <p>The page you are looking for doesn't exist or has been moved.</p>
                <Button as={Link} to='/dashboard'>Back to Overview</Button>
            </div>
        </>
    )
}
