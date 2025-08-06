// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Home from './pages/Home'
import Register from './pages/register';
import HomeRegister from './pages/HomeRegister';
import MobileSuits from './pages/MobileSuits'
import MobileSuitsEditor from './pages/MobileSuitsEditor'
import PartDetail from './pages/parts/PartDetail';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
         <Route path="/Register" element={<Register />} />
         <Route path="/HomeRegister" element={<HomeRegister />} />
        <Route path="/mobileSuits" element={<MobileSuits />} />
        <Route path="/MobileSuitsEditor" element={<MobileSuitsEditor />} />
        <Route path="/part/:msNumber/:partType/:partName" element={<PartDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
