import React from 'react'
import Navbar from './components/Navbar.jsx'
import LandingPage1 from './Pages/LandingPage1.jsx'
import LandingPage2 from './Pages/LandingPage2.jsx'
import LandingPage3 from './Pages/LandingPage3.jsx'
import LandingPage4 from './Pages/LandingPage4.jsx'
import LandingPage5 from './Pages/LandingPage5.jsx'
import LandingPage6 from './Pages/LandnigPage6.jsx'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from './Pages/Homepage.jsx'
const App = () => {
  return (
    <>
    <div>
      {/* <Navbar /> */}
      <Router basename='/LandingPage/'>
        <Routes>
         <Route index element={<Homepage />} />
          <Route path='/landing2/preview1' element={<LandingPage1 />} />
          <Route path='/landing2/preview2' element={<LandingPage2 />} />
          <Route path='/landing2/preview3' element={<LandingPage3 />} />


          {/* Landing PAge 1 */}
          <Route path='/landing1/preview1' element={<LandingPage4 />} />
          <Route path='/landing1/preview2' element={<LandingPage5 />} />
          <Route path='/landing1/preview3' element={<LandingPage6 />} />
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App