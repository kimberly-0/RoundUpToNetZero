import Header from './Header';
import SideNav from './SideNav';

const Layout = ({ children }) => {
    return(
        <div className='layout'>
            <Header />

            <main className='main'>
                <SideNav />
                <div className='page-content'>{ children }</div>
            </main>
        </div>
    )
}

export default Layout;