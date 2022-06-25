import './css/main.css';
import Login from './component/pages/Login';
import Signup from './component/pages/Signup';
import Home from './component/pages/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        
        <Route index exact path="/" element={<Login />} />
        <Route index exact path="/signup" element={<Signup />} />
        <Route index exact path="/dashboard" element={<Home />} />
        
      </Routes>
      
    </div>
  );
}

export default App;
