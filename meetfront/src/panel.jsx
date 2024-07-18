// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useState } from 'react';  // * React
import './css/panel.css';                 // * CSS
import ehdlogo from './assets/ehd.png';   // * ehd.png
import Index from './panelIndex';         // * panelIndex.jsx
import Member from './panelMember';       // * panelMember.jsx
import New from './panelNew';             // * panelNew.jsx


// ! Ana fonksiyon
function Panel() {
  const [currentSection, setCurrentSection] = useState('Index');
  const handleMenuClick = (section) => {
    setCurrentSection(section);
  };
  return (
    <>
    <div className="mainPanel">
      <div className="sidebarPanel">
        <img src={ehdlogo} onClick={() => handleMenuClick('Index')} style={{cursor: "pointer"}} />
        <a onClick={() => handleMenuClick('Member')}>Üye Yönetimi</a>
        <a onClick={() => handleMenuClick('New')}>Haber Yönetimi</a>
        <div className="sidebarfooter">
          <i>Coded by HarunBulbull</i>
        </div>
      </div> 
      <div className="contentPanel">
        {currentSection === 'Index' && <Index/>}
        {currentSection === 'Member' && <Member/>}
        {currentSection === 'New' && <New/>}
      </div>
    </div>
    </>
  )
}


export default Panel
