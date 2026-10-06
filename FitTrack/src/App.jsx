import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Layout from './components/Layout'
import Trainings from './pages/Trainings'
import Exercises from './pages/Exercises'
import Callendar from './pages/Callendar'
import Statistics from './pages/Statistics'
import Profile from './pages/Profile'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
               

                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                     <Route path="/trainings" element={<Trainings />} />
                      <Route path="/exercises" element={<Exercises />} />
                      <Route path="/callendar" element={<Callendar />} />
                      <Route path="/statistics" element={<Statistics />} />
                      <Route path="/profile" element={<Profile />} />
                      
                </Route>

                <Route path="*" element={<Login />} />
            </Routes>
        </Router>
    )
}

export default App