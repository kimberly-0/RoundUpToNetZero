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
import Invest from './views/pages/Invest';
import Settings from './views/pages/Settings';

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
        <Route path='/invest' element={ <Invest userId={loggedInUserId}/> } />
        <Route path='/invest/:id' element={ <SingleInvestment userId={loggedInUserId}/> } />
        <Route path='/settings' element={ <Settings userId={loggedInUserId}/> } />
      </Routes>
    </div>
  );
}

export default App;
