// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useEffect, useState } from 'react';   // * React
import Navbar from './Navbar';                        // * Navbar.jsx
import './css/Home.css';                              // * CSS
import HomeMain from './assets/homemain.png';         // * HomeMain.png
import New from './reusable/new';                     // * New.jsx
import { useLocation } from 'react-router-dom';       // * Router


// ! Ana fonksiyon
function Home() {
  const location = useLocation();
  const isLoggedIn = location.state?.name;
  const iduser = location.state?.id;
  const [data, setData] = useState([])


  // * Tüm duyuruları çekme
  useEffect(() => {
    fetch('http://localhost:8081/allNews')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
  }, []);


  // * Ekran çıktısı
  return (
    <>
      {isLoggedIn ? (
        <Navbar user={isLoggedIn} id={iduser}/>
      ) : (
        <Navbar user={"Giriş Yap"}/>
      )}
      <div className="homeMain">
        <div className="GridColumn1fr1fr">
          <p>EHD, <b>Hızlı</b> ve <b>Güvenilir</b> Çevrimiçi Görüşme Aracı</p>
          <img src={HomeMain} />
        </div>
        <div className="homeLines">
          <div className="homeLine1">
            <span></span>
            <i>Keşfetmeye</i>
            <span></span>
          </div>
          <span></span>
          <div className="Arrows ArrowsWhite">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="homeLine2">
            <span></span>
            <i>Başla!</i>
            <span></span>
          </div>
        </div>
      </div>
      <div className="homeSecond">
        <h1 style={{marginBottom: "1rem", fontSize: "20px"}}><b>Duyurular</b></h1>
        <div className="newsarea">
            {data.map((d, i)=> (
              <div key={i}>
                <New id={d.id} header={d.header} img={d.img} />
              </div>
            ))}
        </div>
      </div>
      <div className="homeFooter">
        <span></span>
        <h3>EHD, Coded by harunbulbull © 2024</h3>
      </div>
    </>
  )
}

export default Home
