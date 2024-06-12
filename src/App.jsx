import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import './App.css'
import Navbar from './components/Navbar';
// Pages Components
import Homepage from './pages/Homepage';
import ChatHomePage from "./pages/ChatHomePage";
import ChatPage from "./pages/ChatPage";
import AboutPage from "./pages/AboutPage";
import NotFoundPage from "./pages/NotFoundPage";

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
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App
