// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React from 'react';                  // * React
import './css/panel.css';                   // * CSS
import ehdlogo from './assets/ehd.png';     // * ehd.png


// ! Ana fonksiyon
function panelIndex() {
  return (
    <>
    <div className="panelFlexColumn panelMargin2">
      <img src={ehdlogo} width={"25%"} style={{minWidth: "400px", position: "relative", left: "50%", transform: "translateX(-50%)"}} />
      <h1 style={{textAlign: "center"}}><b>Admin Paneline Hoş Geldiniz!</b></h1>
      <p><b>Üye yönetimi</b> sekmesinden kayıtlı tüm üyeleri görebilir, yeni üyeler kaydedebilir, tüm üyelerin verilerini güncelleyebilir ya da silebilirsiniz.</p>
      <p><b>Haber yönetimi</b> sekmesinden tüm haberlere erişebilir, güncelleyebilir ve silebilirsiniz.</p>
      <br></br>
      <br></br>
      <i style={{textAlign: "center"}}>HarunBulbull tarafından kodlanmıştır.</i>
      <div className="panelFlex">
        <a href="https://www.instagram.com/hrn_blbl" target="_blank">Instagram</a>
        <a href="https://www.github.com/HarunBulbull" target="_blank">Github</a>
        <a href="https://www.linkedin.com/in/harun-bülbül-5b0a022a6/" target="_blank">LinkedIn</a>
      </div>
    </div>
    </>
  )
}


export default panelIndex
