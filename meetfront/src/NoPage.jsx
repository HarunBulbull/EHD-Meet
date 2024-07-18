// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React from 'react';              // * React
import EHDLogo from './assets/ehd.png'  // * ehd.png
import './css/NoPage.css'               // * CSS


// ! Ana fonksiyon
function NoPage() {
  return (
    <div className="NoPagemain">
      <img src={EHDLogo} />
      <h1>Aradığınız sayfa bulunamadı</h1>
      <i>Linkinizi kontrol edebilirsiniz ya da aşağıdaki butondan <b style={{color: '#242368', textDecoration: 'underline'}}>ana sayfaya</b> dönebilirsiniz.</i>
      <a href="/">Ana sayfa</a>
    </div>
  )
}

export default NoPage
