import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';                                       
import './App.css'
import PlotList from './pages/PlotList';
import Home from './pages/Home';
import AgronomicActivity from './pages/AgronomicActivity';


function App() {

  return (
    <>
      <Router>
      <Routes>
      <Route path='/' element={<Home/>}/>
        <Route path='/plotland' element={<PlotList/>}/>
        <Route path='/agronomicActivity' element={<AgronomicActivity/>}/>

      </Routes>
      </Router>
    </>
  )
}

export default App
