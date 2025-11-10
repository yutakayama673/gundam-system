// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login, { Register } from './pages/login'
import Home, { HomeRegister } from './pages/home'
import MobileSuits, { MobileSuitsEditor } from './pages/mobileSuits'
import PartDetail from './pages/partsToSee'

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
