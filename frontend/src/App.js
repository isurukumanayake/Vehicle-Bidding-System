import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import { Toaster } from 'react-hot-toast';
import Vehicles from './pages/Vehicles';
import Cart from "./pages/Cart";
import Vehicle from "./pages/Vehicle";

function App() {
  return (
    <Router>

      <Toaster />

      <Routes>

        <Route path='/' element={<Vehicles />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/vehicle/:id' element={<Vehicle />} />

      </Routes>

    </Router>
  );
}

export default App;
