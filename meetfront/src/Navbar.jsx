// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useEffect, useState } from 'react';   // * React
import EHDLogo from './assets/ehd.png';               // * Ehd.png
import './css/navbar.css'                             // * CSS
import { useNavigate } from 'react-router-dom';       // * Router
import Notifications from './notifications';          // * Notification.jsx
import axios from 'axios';                            // * Axios (backend haberleşmesi için)

// ! Değişkenler
let name;   // * Kullanıcı adı
let nameid; // * Kullanıcı idsi



// ! Ana fonksiyon
function Navbar({user, id}) {
  const navigate = useNavigate();
  const [menu, setMenu] = useState(false);
  const [isAdmin, setAdmin] = useState(false);
  name = user;
  nameid = id;
  let nb = 0;
  
  // * Ana sayfa
  const handleHome = () => {
    navigate('/', { state: { name: name, id: nameid } });
  }
  

  // * Bildirimler
  const handlenotifications = () => {
    const notbar = document.getElementById("not");
    if(nb<1){
      notbar.style.display = "block";
      nb++;
    }else{
      notbar.style.display = "none";
      nb = 0;
    }
  }


  // * Görüşmeye başla
  const handleStartMeet = () => {
    if(name != "Giriş Yap"){
      navigate('/GorusmeyeBasla', { state: { name: name, id: nameid } });
    }else{
      navigate('/Giris');
    }
  } 


  // * Uygulama çalışınca getAdmin fonksiyonunu döndür
  useEffect( () => {
    getAdmin();
  }, []);



  // * Girilen kullanıcı admin mi
  const getAdmin = async () => {
    try {
      const response = await axios.post('http://localhost:8081/getAdminbyID', {
        id: nameid
      });
      if (response.data[0].isAdmin == true) {
        setAdmin(true);
      }
    } catch (error) {
      console.error(error);
    }
  }


  // * Yönetici Paneli
  const handleAdminPanel = () => {
    navigate('/Admin', { state: { isAdmin: isAdmin } });
  };

  
  // * Responsive menu aç kapat
  const handleMenu = () => {
    setMenu(!menu);
  }


  // * Ekran çıktısı
  return (
    <>
    {menu && 
    <div className="navbar_nav_hide">
      <ul>
        <li><a onClick={handleHome}>Ana Sayfa</a></li>
        <li><a onClick={handleStartMeet}>Görüşmeye Başla</a></li>
        <li><a href="/Giris">{user}</a></li>
        <li><a onClick={handlenotifications}>Bildirimler</a></li>
        {isAdmin && <li><a onClick={handleAdminPanel}>Yönetici Paneli</a></li>} 
      </ul>
    </div>
    }
    <div className="navbar_nav">
      <div className="menu" onClick={handleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <img src={EHDLogo} className='brand' />
      <ul>
        <li><a onClick={handleHome}>Ana Sayfa</a></li>
        <li><a onClick={handleStartMeet}>Görüşmeye Başla</a></li>
        <li><a href="/Giris">{user}</a></li>
        <li><a onClick={handlenotifications}>Bildirimler</a></li>
        {isAdmin && <li><a onClick={handleAdminPanel}>Yönetici Paneli</a></li>} 
      </ul>
    </div>
    <div className="navbar_notifications" id="not">
      <Notifications id={nameid} name={name}/>
    </div>
    </>
  )
}

export default Navbar
