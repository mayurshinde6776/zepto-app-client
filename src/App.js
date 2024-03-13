
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Cards from './components/Cards';
import CardsDetails from './components/CardsDetails';
import Cancel from './components/cancel.js';
import Success from './components/success.js';
import SuccessPage from './components/SuccessPage.js';

function App() {
  return (
    <>
  {/* we have added BrowserRouter in Index.js file */}
   <Header/>
   <Routes>
    <Route path='/' element={<Cards/>} />
    <Route path='/home' element={<Cards/>} />
    <Route path='/cart/:id' element={<CardsDetails/>} />
    <Route path='/success' element={<SuccessPage/>} />
    <Route path='/cancel' element={<Cancel/>} />
   </Routes>
    </>
  );
}

export default App;
