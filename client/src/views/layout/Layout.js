import Header from './Header';
import SideNav from './SideNav';

const Layout = ({ children }) => {
    return(
        <>
            <Header />

            <SideNav />

            <main>{ children }</main>
        </>
    )
}

export default Layout;