import { SITE_NAME } from '../../../data/constants';

import './Overview.scss';

export default function Overview() {

    const title = 'Dashboard';

    return (
        <>
            <title>{`${title} | ${SITE_NAME}`}</title>
            <div className='section-overview'>
            </div>
        </>
    )
}
