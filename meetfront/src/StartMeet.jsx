// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useState, useEffect } from 'react';                 // * React
import Navbar from './Navbar';                                      // * Navigasyon Barı
import EHDLogo from './assets/ehd.mp4';                             // * Boş Video
import './css/StartMeet.css';                                       // * CSS Dosyası
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    // * FontAwesome Kütüphanesi
import { faCamera } from '@fortawesome/free-solid-svg-icons'        // * FontAwesome Kütüphanesinden gelen iconlar
import { useNavigate, useLocation } from 'react-router-dom';        // * Router


// ? Rastgele, unique kod oluşturma algoritması
function uuidv4() {
  return 'xxyxyxxyx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}


// ! Ana fonksiyon buraya ellemeyin.
function StartMeet() {

  // * UseState tanımlamaları 
  const [localStream, setLocalStream] = useState(null);
  const [cameraOn, setCameraOn] = useState(true);
  const videoCont = React.useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = location.state?.name;
  const iduser = location.state?.id;


  // * Kamera verisini alma ve işleme
  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setLocalStream(mediaStream);
      } catch (error) {
        console.error('Kameraya erişilirken bir hata oluştu: ', error);
      }
    };
    getMedia();
  }, []);



  // * Kamera useState sonucuna göre görüntüyü gösterme/kapatma
  useEffect(() => {
    if (localStream) {
      videoCont.current.srcObject = localStream;
      if (!cameraOn) {
        videoCont.current.srcObject = null;
      } else {
        videoCont.current.srcObject = localStream;
      }
    }
  }, [localStream, cameraOn]);



  // * Kamera tuşuna basıldıkça useState sonucu ve style değiştirme
  const handleCameraToggle = () => {
    const cam = document.querySelector('#webcam');
    setCameraOn(!cameraOn);
    if (cameraOn === false) {
      cam.classList = "device";
    } else {
      cam.classList = "nodevice";
    }
  };



  // * Odaya katıl tuşu fonksiyonu
  const joinHandle = (e) => {
    const code = document.getElementById('roomcode').value;
    e.preventDefault();
    navigate('/Gorusme', { state: { room: code, name: location.state?.name, id: iduser } });
  }



  // * Oda oluşturma tuşu fonksiyonu
  const createbuttonHandle = (e) => {
    const createButton = document.getElementById('cb');
    e.preventDefault();
    createButton.disabled = true;
    createButton.innerHTML = 'Oda oluşturuluyor...'; // * Buton içindeki yazıyı değiştirme
    createButton.style.backgroundColor = '#393e46';
    navigate('/Gorusme', { state: { room: uuidv4(), name: location.state?.name, id: iduser } });
  };


  
  // * Ekran çıktısı
  return (
    <>
      {isLoggedIn ? (
    <Navbar user={isLoggedIn} id={iduser}/>
      ) : (
        navigate('/Giris')
        
      )}
      <div className="flex width80">
        <div className="flexColumn">
          <button className='CreateButton' id='cb' onClick={createbuttonHandle}>Oda oluştur</button>
          <div className="join">
            <input className="joinInput" id='roomcode' type="text" placeholder='Oda Kodu' />
            <button className="joinButton" onClick={joinHandle}>Odaya Katıl</button>
          </div>
          <div className="device" id="webcam" onClick={handleCameraToggle}><i><FontAwesomeIcon icon={faCamera} /></i></div>
        </div>
        <video src={EHDLogo} ref={videoCont} className='video-self' autoPlay muted playsInline></video>
      </div>
    </>
  )
}

export default StartMeet
