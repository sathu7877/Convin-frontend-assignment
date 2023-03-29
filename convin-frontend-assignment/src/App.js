import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Header from "./components/Header";
import Sports from "./components/Sports";
import Entertainment from "./components/Entertainment";
import Education from "./components/Education";
import History from "./components/History";

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Header/>
        <Routes>
          <Route path="/" element={<Sports />} />
          <Route path="/sports" element={<Sports />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route path="/education" element={<Education />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
