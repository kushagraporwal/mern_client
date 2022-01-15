import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import 'bootstrap/dist/css/bootstrap.css'

function App() {
  return (
   <>
   <Routes>
   <Route exact path="/" element={<Login/>}/>
     <Route exact path="/home" element={<Home/>}/>
     </Routes>
   </>
  );
}

export default App;
