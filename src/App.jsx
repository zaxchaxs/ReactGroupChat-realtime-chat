import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { AuthProvider } from "./contexts/AuthContext";
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import ChatHomePage from "./pages/ChatHomePage";
import ChatPage from "./pages/ChatPage";
import AboutPage from "./pages/AboutPage";

function App() {

  return (
    <>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/chat-homepage" element={<ChatHomePage />} />
            <Route path="/chat-page" element={<ChatPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
