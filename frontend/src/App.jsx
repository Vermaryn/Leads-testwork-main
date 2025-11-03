import {BrowserRouter , Routes , Route} from 'react-router-dom';
import LeadForm from './components/leadForm/LeadForm';
import ShowLeads from './components/showLeads/ShowLeads';
import Navbar from './components/Navbar'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<LeadForm/>}/>
        <Route path='/showLeads' element={<ShowLeads/>}/>
      </Routes>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} theme="colored" newestOnTop />
    </>
  )
}

export default App
