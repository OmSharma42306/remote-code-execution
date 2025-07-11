import { Routes,Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import Home from './pages/Home'


function App() {

  return (    
    <Routes>        
        <Route path="/" element={<LandingPage />}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signup" element={<SignupPage />}/>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
    </Routes>
  )
}

export default App
