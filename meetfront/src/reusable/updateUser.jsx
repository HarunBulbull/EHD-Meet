// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useState } from 'react';                            // * React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    // * FontAwesome Kütüphanesi
import { faUpload } from '@fortawesome/free-solid-svg-icons'        // * FontAwesome Kütüphanesi
import '../css/panelReusable.css'                                   // * CSS
import axios from 'axios';                                          // * Axios (Backend haberleşmesi için)
import FetchError from './fetchError';                              // * FetchError.jsx (Mail check kısmında sorun çıkarsa gözükecek)
import Error from './error';                                        // * Error.jsx (Hata alındığında gözükecek)


// ! Ana fonksiyon
function updateUser({ id, name, mail, password, admin, onClose }) {
  const [userEr, setUserEr] = useState(null);
  const [ErrorVisible, setErrorVisible] = useState(null);

  // * 5 saniye hata gösterme fonksiyonu
  function showError(content) {
    setErrorVisible(content);
    setTimeout(() => {
      setErrorVisible(null);
    }, 5000);                 // ? 5 saniyeden uzun istiyorsanız burayı düzenleyin!
  }


  // * İptal butonu
  const handleClose = () => {
    onClose();
  };



  // * Devam butonu
  const handledeleteUser = () => {
    let admin1 = false;
    if(document.getElementById("adminholder").checked){
      admin1 = true;
    }
    const n1 = document.getElementById("nameholder").value;
    const n2 = document.getElementById("mailholder").value;
    const n3 = document.getElementById("passwordholder").value;
    if(n1 != "" && n2 != "" && n3 != ""){
      if (n2.includes("@")) {
        if (n2.split('@')[1].includes(".")) {
          if (n2.split('@')[1].split('.')[0].length > 2) {
            if (n2.split('@')[1].split('.')[1].length > 1) {
              axios.post('http://localhost:8081/updateUser', {
                name: n1,
                mail: n2,
                password: n3,
                admin: admin1,
                id: id
              })
                .then(response => {
                  if (response.data.success) {
                    onClose();
                  } else {
                    showError("Üye kaydedilemedi!");
                  }
                })
                .catch(error => {
                  console.error(error);
                  alert("Üye güncelleme işleminde beklenmeyen bir hata oluştu!")
                })
              }else {
                showError("Geçersiz e-posta!");
              }
            }else {
              showError("Geçersiz e-posta!");
            }
          }else {
            showError("Geçersiz e-posta!");
          }
        }else {
          showError("Geçersiz e-posta!");
        }
      } else {
        showError("Lütfen tüm alanları doldurun!");
      }
    }


  // * E-posta yazılırken check etme fonksiyonu
  const handlemailchange = () => {
    const n1 = document.getElementById("mailholder");
    if (n1.value.includes("@")) {
      if (n1.value.split('@')[1].includes(".")) {
        if (n1.value.split('@')[1].split('.')[0].length > 2) {
          if (n1.value.split('@')[1].split('.')[1].length > 1){
            if(n1.value != mail){
              axios.post('http://localhost:8081/getmailUnique', {
                name: n1.value
              })
                .then(response => {
                  if (response.data.length > 0) {
                    n1.style.borderBottom = "2px solid red";
                    n1.style.color = "red";
                    setUserEr("Bu e-posta kullanılıyor!");
                  } else {
                    n1.style.borderBottom = "2px solid black";
                    n1.style.color = "black";
                    setUserEr(null);
                  }
                })
                .catch(error => {
                  console.error(error);
                  alert("Bir hata oluştu!");
                });
            }else{
              n1.style.borderBottom = "2px solid black";
                    n1.style.color = "black";
                    setUserEr(null);
            }
          }else {
            n1.style.borderBottom = "2px solid red";
            n1.style.color = "red";
            setUserEr("Geçersiz e-posta!");
          }
        } else {
          n1.style.borderBottom = "2px solid red";
          n1.style.color = "red";
          setUserEr("Geçersiz e-posta!");
        }
      } else {
        n1.style.borderBottom = "2px solid red";
        n1.style.color = "red";
        setUserEr("Geçersiz e-posta!");
      }
    } else {
      n1.style.borderBottom = "2px solid red";
      n1.style.color = "red";
      setUserEr("Geçersiz e-posta!");
    }
    if (n1.value == "") {
      n1.style.borderBottom = "2px solid black";
      n1.style.color = "black";
      setUserEr(null);
    }
  }


  // * Ekran Çıktısı
  return (
    <>
      <div className="blackblurbg"></div>
      <div className="boxarea" id="boxarea" style={{zIndex: 9999}}>
      {ErrorVisible && <Error header={"HATA!"} content={ErrorVisible}/>}
      </div>
      <div className="deleteForm">
        <FontAwesomeIcon className="mainIcon" style={{color: "rgba(255, 165, 0, .5)", border: "2px solid rgba(255, 165, 0, .5)"}} icon={faUpload} />
        <div className="deleteInfo" style={{gap: "1rem"}}>
          <input type="text" id="nameholder" placeholder="Ad Soyad" className='userfinder' defaultValue={name} style={{width: "80%", maxWidth: "500px"}}/>
          <div className="panelFlex">
            <input type="text" id="mailholder" placeholder="Mail Adresi" onChange={handlemailchange} defaultValue={mail} className='userfinder' style={{ width: "80%", maxWidth: "500px" }} />
            {userEr && <FetchError text={userEr} />}
          </div>
          <input type="text" id="passwordholder" placeholder="Şifre" className='userfinder' defaultValue={password} style={{width: "80%", maxWidth: "500px"}}/>
          <div className="panelFlex" style={{gap: ".3rem", justifyContent: "start", width: "80%", maxWidth: "500px"}}>
          <input type="checkbox" name="cb" id="adminholder"/>
          <label htmlFor="adminholder">Yönetici</label>
          </div>
        </div>
        <div className="deleteButtons">
          <button className='deleteButton' onClick={handleClose}>İptal</button>
          <button className='deleteButton' onClick={handledeleteUser} style={{backgroundColor: "rgb(255, 165, 0)"}}>Güncelle</button>
        </div>
      </div>
    </>
  )
}

export default updateUser
