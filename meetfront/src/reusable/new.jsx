// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React from 'react';                        // * React
import '../css/new.css'                           // * CSS
import { useNavigate } from 'react-router-dom';   // * Router

// ! Ana fonksiyon
function New({id, header, img}) {
  const navigate = useNavigate();

  // * Haber yönlendiricisi
  const handleNavigateNew = (id) => {
    navigate('/Duyuru', { state: { id: id } });
  }


  // * Ekran çıktısı
  return (
    <div className="new" onClick={() => handleNavigateNew(id)}>
      <img src={`http://localhost:8081/images/${img.split("\\")[2]}`} className='newimage'/>
      <div className="contentarea">
        <h1>{header}</h1>
        <button>Görüntüle</button>
      </div>
    </div>
  )
}

export default New
