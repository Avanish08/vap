import './App.css';
import Footer from './Components/Footer';
import Header from './Components/Header';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bus from './Templates/Bus';
import Train from './Templates/Train';
import Login from './Templates/Login';

import TrainDetails from './Templates/TrainBooking';
import BusResults from './Templates/BusResult';

function App() {
  return (
   <>
   <BrowserRouter>
   <Navbar/>
   <Header/>
   <Routes>
   <Route path="/" element={< Train/>} />
   <Route path="/Login" element={< Login/>} />
   <Route path="/bus" element={<Bus />} />
   <Route path="/trainbooking" element={<TrainDetails/>} /> 
   <Route path="/busresults" element={<BusResults />} />     
   </Routes>
   <Footer/>
   </BrowserRouter>
   </>
  );
}

export default App;
