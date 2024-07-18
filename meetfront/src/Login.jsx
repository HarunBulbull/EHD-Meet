// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useState } from 'react';                            // * React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    // * FontAwesome Kütüphanesi
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'     // * FontAwesome Kütüphanesi
import Error from './reusable/error';                               // * Error.jsx
import './css/login.css'                                            // * CSS
import axios from 'axios';                                          // * Axios (Backend haberleşmesi için)
import { useNavigate } from 'react-router-dom';                     // * Router
import EHDLogo from './assets/ehd.png';                             // * Ehdlogo.png

// ! Ana fonksiyon buraya ellemeyin.
function Giris() {
  const navigate = useNavigate();
  const [ErrorVisible, setErrorVisible] = useState(false);

  // * Giriş yap butonu
  const handleLogin = async () => {
    const username = document.getElementById("un").value;
    const password = document.getElementById("pw").value;
    try {
      const response = await axios.post('http://localhost:8081/login', {
        un: username,
        pwd: password
      });
      if (response.data.length > 0) {
        navigate('/', { state: { name: response.data[0].name, id: response.data[0].id} });
      } else {
        showError()
      }
    } catch (error) {
      console.error(error);
      showError();
    }
  };


  // * Geri dön butonu
  const handleBack = () => {
    document.location.href = "/"
  }


  // * 5 saniye hata gösterme fonksiyonu
 function showError(content) {
  setErrorVisible(content);
  setTimeout(() => {
    setErrorVisible(null);
  }, 5000);                 // ? 5 saniyeden uzun istiyorsanız burayı düzenleyin!
}

  // * Ekran çıktısı
  return (
    <>
    <div className="formbg"></div>
    <div className="boxarea" id="boxarea">
    {ErrorVisible && <Error header={"HATA!"} content={"Giriş bilgileriniz hatalı!"}/>}
    </div>
    <div className="form">
      <div className="logoarea">
        <img src={EHDLogo} width={"300px"} />
      </div>
      <h1 className='formTitle'><b>GİRİŞ</b></h1>
      <input className="formInput" type="text" id="un" placeholder='E-Posta'/>
      <input className="formInput" type="password" id="pw" placeholder='Şifre'/>
      <button className='formButton' onClick={handleLogin}>Giriş yap</button>
      <div className="formBottom">
      <FontAwesomeIcon icon={faArrowLeft} style={{
        width: "40px",
        height: "40px",
        cursor: "pointer"
        }}
      onClick={handleBack}
      />
        <p>coded by HarunBulbull</p>
      </div>
    </div>
    </>
  )
}

export default Giris
