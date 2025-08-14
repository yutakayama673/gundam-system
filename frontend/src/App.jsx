// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import Register from './pages/login/register';
import HomeRegister from './pages/home/HomeRegister';
import MobileSuits from './pages/mobileSuits/MobileSuits'
import MobileSuitsEditor from './pages/mobileSuits/MobileSuitsEditor'
import PartDetail from './pages/partsToSee/PartDetail';

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
