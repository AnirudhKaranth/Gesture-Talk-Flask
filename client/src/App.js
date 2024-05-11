import logo from './logo.svg';import './App.css';
import { BrowserRouter } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path="/" element={<Landing/> } /> */}
    </Routes>
    
  </BrowserRouter>
  );
}

export default App;
