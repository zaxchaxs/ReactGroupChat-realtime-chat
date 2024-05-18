import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
import Chatpage from "./pages/Chatpage";

function App() {

  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/chat" element={<Chatpage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
