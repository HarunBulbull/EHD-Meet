// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useEffect, useState } from 'react';           // * React
import './css/Home.css';                                      // * CSS
import { useNavigate, useLocation } from 'react-router-dom';  // * Router
import axios from 'axios';                                    // * Axios (backend haberleşmesi için)


// ! Ana fonksiyon
function ShowNew() {
  const location = useLocation();
  const iduser = location.state?.id;
  const [header, setHeader] = useState([]);
  const [content, setContent] = useState([]);
  const [img, setImg] = useState([]);
  const [date, setDate] = useState([]);
  const navigate = useNavigate();

  // * Haber verilerini çek
  useEffect(() => {
    axios.post('http://localhost:8081/getNew', {
      id: iduser
    })
      .then(response => {
        if (response.data.length > 0) {
          setHeader(response.data[0].header);
          setContent(response.data[0].content);
          setImg(response.data[0].img.split("\\")[2]);
          setDate(response.data[0].date.split("T")[0] + " " + response.data[0].date.split("T")[1].split('.')[0]);
        }
      })
      .catch(error => {
        console.error(error);
        alert("Bir hata oluştu!");
      });
  }, []);


  // * Geri dön
  const handleBack = () => {
    navigate('/');
  }


  // * Ekran çıktısı
  return (
    <>
      <div className="goBack" onClick={handleBack}>« Geri Dön</div>
      <div className="broadCastArea" style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "3rem"
        }}>
        <div className="broadcastbg">
          <img src={`http://localhost:8081/images/${img}`} className='broadcastImg'/>
          <h1 className='broadcastHeader'>{header}</h1>
          <i className='broadcastDate'>{date}</i>
          <p style={{margin: "3rem", wordWrap: "break-word"}}>{content}</p>
        </div>
      </div>
    </>
  )
}

export default ShowNew
