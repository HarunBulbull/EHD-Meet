// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useEffect, useState } from 'react';                 // * React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    // * FontAwesome Kütüphanesi
import { faUpload } from '@fortawesome/free-solid-svg-icons'        // * FontAwesome Kütüphanesi
import '../css/panelReusable.css'                                   // * CSS
import axios from 'axios';                                          // * Axios (Backend haberleşmesi için)
import Error from './error';                                        // * Error.jsx (Hata alındığında gözükecek)


// ! Ana fonksiyon
function updateNew({ id, header, content, img, onClose }) {
  const [ErrorVisible, setErrorVisible] = useState(null);
  const [file, setFile] = useState();
  const [filepath, setFilePath] = useState();

  // * Dosya aktarma foksiyonu
  useEffect(() => {
    setFilePath(img); // ! Buna ellemeyin

    // ?
    // ? Buradan itibaren seçilen dosya adının ilk 20 karakterini 
    // ? file type input'un içine yazar.
    // ?
    const fileName = img.split('\\')[2];
    const MAX_FILE_NAME_LENGTH = 20;          // * Karakter sınırı
    if (fileName.length > MAX_FILE_NAME_LENGTH) {
      const firstPart = fileName.slice(0, MAX_FILE_NAME_LENGTH - 3);
      const lastPart = fileName.slice(fileName.length - 3);
      const shortenedFileName = `${firstPart}...${lastPart}`;
      document.getElementById('panelFileLabel').innerHTML = shortenedFileName;
    } else {
      document.getElementById('panelFileLabel').innerHTML = fileName;
    }
  }, []);


  // * Dosya aktarma fonksiyonu, içeriği neredeyse yukarıdakiyle aynı.
  // ? Yukarıdaki fonksiyon ekran açılınca haberde kayıtlı görseli yükler
  // ? Bu fonksiyon tekrar görsel seçilirse çalışır
  const handleFile = (e) => {
    setFile(e.target.files[0]);
    setFilePath(e.target.files[0].name);
    const fileName = e.target.files[0].name;
    const MAX_FILE_NAME_LENGTH = 20;
    if (fileName.length > MAX_FILE_NAME_LENGTH) {
      const firstPart = fileName.slice(0, MAX_FILE_NAME_LENGTH - 3);
      const lastPart = fileName.slice(fileName.length - 3);
      const shortenedFileName = `${firstPart}...${lastPart}`;
      document.getElementById('panelFileLabel').innerHTML = shortenedFileName;
    } else {
      document.getElementById('panelFileLabel').innerHTML = fileName;
    }
  }


  // * Devam butonnu
  const handleSubmit = async () => {
    if(filepath != img){                              // ! Resimin değiştirilip değiştirilmediğini kontrol eder.
      const formdata = new FormData();
      formdata.append('image', file);
      const n1 = document.getElementById("headerholder").value;
      const n2 = document.getElementById("contentholder").value;
      axios.post("http://localhost:8081/upload", formdata)
        .then(async res => {
          if (n1 != "" && n2 != "") {
            try {
              const response = await axios.post('http://localhost:8081/updateNew', {
                header: n1,
                content: n2,
                img: res.data.path,
                id: id
              });
              if (response.data.success) {
                onClose();
              } else {
              }
            } catch (error) {
              console.error(error);
            }
          } else {
            showError("Lütfen tüm alanları doldurun!");
          }
        })
        .catch(err => console.log(err));
    }else{
      const n1 = document.getElementById("headerholder").value;
      const n2 = document.getElementById("contentholder").value;
      if (n1 != "" && n2 != "") {
        try {
          const response = await axios.post('http://localhost:8081/updateNew', {
            header: n1,
            content: n2,
            img: filepath,
            id: id
          });
          if (response.data.success) {
            onClose();
          } else {
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        showError("Lütfen tüm alanları doldurun!");
      }
    }
  };


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


  // * Ekran Çıktısı
  return (
    <>
      <div className="blackblurbg"></div>
      <div className="boxarea" id="boxarea" style={{ zIndex: 9999 }}>
        {ErrorVisible && <Error header={"HATA!"} content={ErrorVisible} />}
      </div>
      <div className="boxarea" id="boxarea" style={{ zIndex: 9998 }}>
        <div className="deleteForm" style={{ width: "70%", maxWidth: "1500px", height: "90%" }}>
          <FontAwesomeIcon className="mainIcon" style={{ color: "rgba(255, 165, 0, .5)", border: "2px solid rgba(255, 165, 0, .5)" }} icon={faUpload} />
          <div className="deleteInfo" style={{ gap: "1rem" }}>
            <input type="text" id="headerholder" placeholder="Başlık" className="userfinder" style={{ width: "90%" }} defaultValue={header} />
            <textarea id="contentholder" placeholder="İçerik" className="textareaholder" defaultValue={content} />
            <div className="panelFlex">
              <input type="file" className='panelFile' id="fileinput" onChange={handleFile} />
              <label htmlFor="fileinput" className='panelFileLabel' id="panelFileLabel">Dosya Seç</label>
            </div>
          </div>
          <div className="deleteButtons">
            <button className="deleteButton" onClick={handleClose}>İptal</button>
            <button className='deleteButton' onClick={handleSubmit} style={{ backgroundColor: "rgb(255, 165, 0)" }}>Güncelle</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default updateNew
