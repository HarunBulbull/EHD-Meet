// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React from 'react';                                        // * React
import { BrowserRouter, Routes, Route } from 'react-router-dom';  // * Router
import Home from './Home';                                        // * Home.jsx
import NoPage from './NoPage';                                    // * NoPage.jsx
import Giris from './Login';                                      // * Login.jsx
import StartMeet from './StartMeet';                              // * StartMeet.jsx
import Rroom from './Rroom';                                      // * Rroom.jsx
import AllUsers from './AllUsers';                                // * Allusers.jsx
import Admin from './Admin';                                      // * Admin.jsx
import ShowNew from './ShowNew';                                  // * ShowNew.jsx


// ! Ana fonksiyon
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/GorusmeyeBasla" element={<StartMeet />} />
        <Route path="/Giris" element={<Giris />} />
        <Route path="/Gorusme" element={<Rroom />} />
        <Route path="*" element={<NoPage/>} />
        <Route path="/ALLUSERSONLYSERVERSIDE" element={<AllUsers/>} />
        <Route path="/Admin" element={<Admin/>} />
        <Route path='/Duyuru' element={<ShowNew/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
