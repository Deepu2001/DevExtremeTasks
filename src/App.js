import 'devextreme/dist/css/dx.light.css';
import './App.css';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DiagnosticCriteria from './components/DiagnosticCriteria';

function App() {
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<Sidebar/>}/>
        <Route path="/popup" element={<DiagnosticCriteria/>}/>
      </Routes>
     </Router>
    </div>
  );
}

export default App;
