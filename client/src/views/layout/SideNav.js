import { NavLink } from 'react-router-dom';

function SideNav() {
    return (
        <nav className='side-nav'>
            <div className='side-nav__top'>
                <NavLink 
                    to='/dashboard'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    Dashboard
                </NavLink>

                <NavLink 
                    to='/transactions'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    Transaction history
                </NavLink>
                <NavLink 
                    to='/investment-history'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    Investment history
                </NavLink>
                <NavLink 
                    to='/invest'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    Invest now
                </NavLink>
            </div>

            <div className='side-nav__bottom'>
                <NavLink 
                    to='/settings'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    Settings
                </NavLink>
                <NavLink 
                    to='/log-in'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    Log out
                </NavLink>
            </div>
        </nav>            
    )
}

export default SideNav;