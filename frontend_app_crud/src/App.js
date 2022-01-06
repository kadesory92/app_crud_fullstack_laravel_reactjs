//import './App.css';
import { Route, Routes } from 'react-router-dom';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import NavBar from './components/NavBar';
import ViewStudent from './components/ViewStudent';

import axios from 'axios';
axios.defaults.baseURL="http://localhost:8000/";

function App() {
  return (
    <div className="App">
      <NavBar/>
      
      <Routes>
        <Route path="/students" element={<ViewStudent/>} />
        <Route path="/add-student" element={<AddStudent/>} />
        <Route path="/edit-student/:id" element={<EditStudent/>} />
      </Routes>
    </div>
  );
}

export default App;
