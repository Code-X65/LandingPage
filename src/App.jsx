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
import LandingPage7 from './Pages/LandingPage7.jsx'
import LandingPage8 from './Pages/LandingPage8.jsx'
import LandingPage9 from './Pages/LandingPage9.jsx'
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
          {/* Selected */}
          <Route path='/landing2/preview3' element={<LandingPage3 />} />


          {/* Landing PAge 1 */}
          <Route path='/landing1/preview1' element={<LandingPage4 />} />
          {/* Selected */}
          <Route path='/landing1/preview2' element={<LandingPage5 />} />
          <Route path='/landing1/preview3' element={<LandingPage6 />} />

          <Route path='/landing3/preview1' element={<LandingPage7 />} />
          <Route path='/landing3/preview2' element={<LandingPage8 />} />
          {/* Selected */}
          <Route path='/landing3/preview3' element={<LandingPage9 />} />
        </Routes>
      </Router>
    </div>
    </>
  )
}

export default App