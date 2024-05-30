import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import ChatHomePage from "./pages/ChatHomePage";
import { AuthProvider } from "./contexts/AuthContext";

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/chat" element={<ChatHomePage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
