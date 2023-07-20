import './App.css';
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<h1>Start screen</h1>} />
        <Route path='/dashboard' element={<h1>Dashboard</h1>} />
      </Routes>
    </div>
  );
}

export default App;
