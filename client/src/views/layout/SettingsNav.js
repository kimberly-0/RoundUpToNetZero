import { NavLink } from 'react-router-dom';

export default function SettingsNav() {
    return (
        <nav className='settings-nav'>
            <NavLink 
                to='/settings/user-details'
                className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                }
            >
                User details
            </NavLink>

            <NavLink 
                to='/settings/company-details'
                className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                }
            >
                Company details
            </NavLink>

            <NavLink 
                to='/settings/payment-methods'
                className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                }
            >
                Payment methods
            </NavLink>

            <NavLink 
                to='/settings/notifications'
                className={({ isActive, isPending }) =>
                    isPending ? 'pending' : isActive ? 'active' : ''
                }
            >
                Notifications
            </NavLink>
        </nav>            
    )
}
