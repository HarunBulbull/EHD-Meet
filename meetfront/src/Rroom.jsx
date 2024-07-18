// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React from 'react';                                          // * React
import './css/StartMeet.css';                                       // * CSS Dosyası
import { useNavigate, useLocation } from 'react-router-dom';        // * Router

// ! Ana fonksiyon
function Rroom() {
  const navigate = useNavigate();
  const location = useLocation();
  const room = location.state?.room;
  const name = location.state?.name;
  const iduser = location.state?.id;
  let i = 0;

  // * Ekran değiştirmede iframe kapatıp ana sayfaya dönme
  const handleLoad = () => {
    i++;
    if(i > 1){
      navigate('/', { state: { name: name, id: iduser} });
    }
  }

  // * Ekran çıktısını socket klasörü içinden düzenleyin!
  return (
    <>
      <div style={{width: "100%", height: "100vh", overflow: "hidden", zIndex: "100"}}>
        <iframe id='ifrm' src={`http://localhost:3000/room.html?room=${room}&name=${name}&iduser=${name}`} onLoad={handleLoad} frameBorder="0" width={"100%"} height={"100%"} allow='camera; microphone; display-capture'></iframe>
      </div>
    </>
  )
}

export default Rroom
