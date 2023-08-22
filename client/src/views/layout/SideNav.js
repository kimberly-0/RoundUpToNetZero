import { NavLink } from 'react-router-dom';
import { BiTachometer, BiDollar, BiLeaf, BiShoppingBag, BiCog, BiLogOut } from "react-icons/bi";

function SideNav() {
    return (
        <nav className='side-nav'>
            <div className='side-nav__top'>
                <NavLink 
                    to='/'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    <p className='side-nav__icon'><BiTachometer /></p>
                    <p className='side-nav__text'>Dashboard</p>
                </NavLink>

                <NavLink 
                    to='/transactions'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    <p className='side-nav__icon'><BiDollar /></p>
                    <p className='side-nav__text'>Transaction history</p>
                </NavLink>
                <NavLink 
                    to='/investment-history'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    <p className='side-nav__icon'><BiLeaf /></p>
                    <p className='side-nav__text'>Investment history</p>
                </NavLink>
                <NavLink 
                    to='/invest'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    <p className='side-nav__icon'><BiShoppingBag /></p>
                    <p className='side-nav__text'>Invest now</p>
                </NavLink>
            </div>

            <div className='side-nav__bottom'>
                <NavLink 
                    to='/settings'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                >
                    <p className='side-nav__icon'><BiCog /></p>
                    <p className='side-nav__text'>Settings</p>   
                </NavLink>
                <NavLink 
                    to='/log-in'
                    className={({ isActive, isPending }) =>
                        isPending ? 'pending' : isActive ? 'active' : ''
                    }
                    onClick={() => localStorage.clear()}
                >
                    <p className='side-nav__icon'><BiLogOut /></p>
                    <p className='side-nav__text'>Log out</p>
                </NavLink>
            </div>
        </nav>            
    )
}

export default SideNav;