import Header from './Header';
import SideMenu from './SideMenu';

const Layout = ({ children }) => {
    return(
        <>
            <Header />

            <SideMenu />

            <main>{ children }</main>
        </>
    )
}

export default Layout;