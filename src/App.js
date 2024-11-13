import logo from './logo.svg';
import './App.css';
import SubscriptionManager from './components/SubscriptionManager/SubscriptionManager.component';
import SubscriptionDashboard from './components/SubscriptionDashboard/SubscriptionDashboard.component';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SubscriptionManager />} />
        <Route path="/subscription/:id" element={<SubscriptionDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
