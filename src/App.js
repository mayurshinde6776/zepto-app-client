
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import CardsDetails from './components/CardsDetails';
import Success from './components/success.js';
import Cancel from './components/cancel.js';

function App() {
  return (
    <>
  {/* we have added BrowserRouter in Index.js file */}
   <Header/>
   <Routes>
    <Route path='/' element={<Cards/>} />
    <Route path='/home' element={<Cards/>} />
    <Route path='/cart/:id' element={<CardsDetails/>} />
    <Route path='/success' element={<Success/>} />
    <Route path='/cancel' element={<Cancel/>} />
   </Routes>
    </>
  );
}

export default App;
