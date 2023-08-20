import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './hooks/useUser';
import { useToken } from './hooks/useToken';
import LogIn from './views/pages/LogIn';
import Dashboard from './views/pages/Dashboard';
import TransactionHistory from './views/pages/TransactionHistory';
import SingleTransaction from './views/pages/SingleTransaction';
import SingleInvestment from './views/pages/SingleInvestment';
import AddTransaction from './views/pages/AddTransaction';
import EditTransaction from './views/pages/EditTransaction';
import InvestmentHistory from './views/pages/InvestmentHistory';
import InvestNow from './views/pages/InvestNow';
import Settings from './views/pages/Settings';
import UserDetailsSettings from './views/components/Settings/UserDetailsSettings';
import CompanyDetailsSettings from './views/components/Settings/CompanyDetailsSettings';
import PaymentMethodsSettings from './views/components/Settings/PaymentMethodsSettings';
import AddPaymentMethod from './views/components/Settings/AddPaymentMethod';
import NotificationsSettings from './views/components/Settings/NotificationsSettings';

function App() {

    const { token, setToken } = useToken();
    const { userId, setUserId } = useUser();

    if( !token || !userId ) {
        return <LogIn setToken={setToken} setUserId={setUserId} />
    }

    return (
        <div className="App">
            <Routes>
                
                <Route path='/log-in' element={ <LogIn setToken={setToken} setUserId={setUserId} /> } />

                <Route path='/' element={ <Dashboard userId={userId}/>  } />

                <Route path='/transactions' element={ <TransactionHistory userId={userId}/> } />

                <Route path='/transactions/:id' element={ <SingleTransaction userId={userId}/> } />

                <Route path='/edit-transaction/:id' element={ <EditTransaction userId={userId}/> } />

                <Route path='/add-transaction' element={ <AddTransaction userId={userId}/> } />

                <Route path='/investment-history' element={ <InvestmentHistory userId={userId}/> } />

                <Route path='/invest' element={ <InvestNow userId={userId}/> } />

                <Route path='/invest/:id' element={ <SingleInvestment userId={userId}/> } />

                <Route path='/settings' element={ <Navigate to='/settings/user-details' />  } />

                <Route path='/settings/user-details' element={ 
                    <Settings userId={userId}>
                        <UserDetailsSettings />
                    </Settings> 
                } />

                <Route path='/settings/company-details' element={ 
                    <Settings userId={userId}>
                        <CompanyDetailsSettings />
                    </Settings> 
                } />

                <Route path='/settings/payment-methods' element={ 
                    <Settings userId={userId}>
                        <PaymentMethodsSettings />
                    </Settings> 
                } />

                <Route path='/settings/payment-methods/add-new' element={ 
                    <Settings userId={userId}>
                        <AddPaymentMethod />
                    </Settings> 
                } />

                <Route path='/settings/notifications' element={ 
                    <Settings userId={userId}>
                        <NotificationsSettings />
                    </Settings> 
                } />

            </Routes>
        </div>
    );
}

export default App;
