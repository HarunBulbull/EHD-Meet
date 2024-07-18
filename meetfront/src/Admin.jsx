// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useState } from 'react';          // * React
import './css/notification.css'                   // * CSS
import { useLocation } from 'react-router-dom';   // * Router
import NoPage from './NoPage';                    // * NoPage.jsx dosyası
import Panel from './panel';                      // * Panel.jsx dosyası


// ! Ana fonksiyon
function Admin() {
  const location = useLocation();
  const adm = location.state?.isAdmin;
  const [isAdmin, setAdmin] = useState(adm);
  return (
    <>
    {isAdmin ? <Panel/> : <NoPage/>} 
    </>
  )
}


export default Admin
