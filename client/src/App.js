import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from './hooks/useUser';
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
import NotificationsSettings from './views/components/Settings/NotificationsSettings';

function App() {

  const loggedInUserId = useUser().id;

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={ <Navigate to={loggedInUserId ? "/dashboard" : "/log-in"} />  } />
        
        <Route path='/log-in' element={ <LogIn /> } />

        
        <Route path='/dashboard' element={ <Dashboard userId={loggedInUserId}/> } />
        
        <Route path='/transactions' element={ <TransactionHistory userId={loggedInUserId}/> } />
        
        <Route path='/transactions/:id' element={ <SingleTransaction userId={loggedInUserId}/> } />
        <Route path='/edit-transaction/:id' element={ <EditTransaction userId={loggedInUserId}/> } />
        
        <Route path='/add-transaction' element={ <AddTransaction userId={loggedInUserId}/> } />
        
        <Route path='/investment-history' element={ <InvestmentHistory userId={loggedInUserId}/> } />
        
        <Route path='/invest' element={ <InvestNow userId={loggedInUserId}/> } />
        
        <Route path='/invest/:id' element={ <SingleInvestment userId={loggedInUserId}/> } />

        <Route path='/settings' element={ <Navigate to='/settings/user-details' />  } />
        
        <Route path='/settings/user-details' element={ 
          <Settings userId={loggedInUserId}>
            <UserDetailsSettings />
          </Settings> 
        } />

        <Route path='/settings/company-details' element={ 
          <Settings userId={loggedInUserId}>
            <CompanyDetailsSettings />
          </Settings> 
        } />

        <Route path='/settings/payment-methods' element={ 
          <Settings userId={loggedInUserId}>
            <PaymentMethodsSettings />
          </Settings> 
        } />

        <Route path='/settings/notifications' element={ 
          <Settings userId={loggedInUserId}>
            <NotificationsSettings />
          </Settings> 
        } />
      </Routes>
    </div>
  );
}

export default App;
