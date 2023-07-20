import './App.css';
import { Routes, Route } from 'react-router-dom';
import LogIn from './views/pages/LogIn';
import Dashboard from './views/pages/Dashboard';
import TransactionHistory from './views/pages/TransactionHistory';
import InvestmentHistory from './views/pages/InvestmentHistory';
import Invest from './views/pages/Invest';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LogIn />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/transaction-history' element={<TransactionHistory />} />
        <Route path='/investment-history' element={<InvestmentHistory />} />
        <Route path='/invest' element={<Invest />} />
      </Routes>
    </div>
  );
}

export default App;
