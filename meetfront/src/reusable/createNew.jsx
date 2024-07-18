// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useState } from 'react';                              // * React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'      // * FontAwesome Kütüphanesi
import { faPlus } from '@fortawesome/free-solid-svg-icons'            // * FontAwesome Kütüphanesi
import '../css/panelReusable.css'                                     // * CSS
import axios from 'axios';                                            // * Axios (Backend haberleşmesi için)
import Error from './error';                                          // * Error.jsx (Hata alındığında gözükecek)



// ! Ana fonksiyon
function createNew({ onClose }) {
  const [ErrorVisible, setErrorVisible] = useState(null);
  const [file, setFile] = useState();


  // * Dosya seçme foksiyonu
  const handleFile = (e) => {
    setFile(e.target.files[0]) // ! Buna ellemeyin!

    // ?
    // ? Buradan itibaren seçilen dosya adının ilk 20 karakterini 
    // ? file type input'un içine yazar.
    // ?
    const fileName = e.target.files[0].name;                                        
    const MAX_FILE_NAME_LENGTH = 20;                  // * Karakter sınırı
    if (fileName.length > MAX_FILE_NAME_LENGTH) {
      const firstPart = fileName.slice(0, MAX_FILE_NAME_LENGTH - 3);
      const lastPart = fileName.slice(fileName.length - 3);
      const shortenedFileName = `${firstPart}...${lastPart}`;
      document.getElementById('panelFileLabel').innerHTML = shortenedFileName;
    } else {
      document.getElementById('panelFileLabel').innerHTML = fileName;
    }
  }



  // * Tamam fonksiyonu
  const handleSubmit = async () => {
    const formdata = new FormData();
    formdata.append('image', file);
    const n1 = document.getElementById("headerholder").value;
    const n2 = document.getElementById("contentholder").value;
    axios.post("http://localhost:8081/upload", formdata)
      .then(async res => {
        if (n1 != "" && n2 != "") {
          try {
            const response = await axios.post('http://localhost:8081/createNew', {
              header: n1,
              content: n2,
              img: res.data.path
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
  };


  // * 5 saniye hata gösterme fonksiyonu
  function showError(content) {
    setErrorVisible(content);
    setTimeout(() => {
      setErrorVisible(null);
    }, 5000);                 // ? 5 saniyeden uzun istiyorsanız burayı düzenleyin!
  }



  // * İptal fonksiyonu
  const handleClose = () => {
    onClose();
  };


  // * Ekran çıktısı
  return (
    <>
      <div className="blackblurbg"></div>
      <div className="boxarea" id="boxarea" style={{ zIndex: 9999 }}>
        {ErrorVisible && <Error header={"HATA!"} content={ErrorVisible} />}
      </div>
      <div className="boxarea" id="boxarea" style={{ zIndex: 9998 }}>
        <div className="deleteForm" style={{ width: "70%", maxWidth: "1500px", height: "90%" }}>
          <FontAwesomeIcon className="mainIcon" style={{ color: "rgba(0, 190, 0, .5)", border: "2px solid rgba(0, 190, 0, .5)" }} icon={faPlus} />
          <div className="deleteInfo" style={{ gap: "1rem" }}>
            <input type="text" id="headerholder" placeholder="Başlık" className="userfinder" style={{ width: "90%" }} />
            <textarea id="contentholder" placeholder="İçerik" className="textareaholder" />
            <div className="panelFlex">
              <input type="file" className='panelFile' id="fileinput" onChange={handleFile} />
              <label htmlFor="fileinput" className='panelFileLabel' id="panelFileLabel">Dosya Seç</label>
            </div>
          </div>
          <div className="deleteButtons">
            <button className="deleteButton" onClick={handleClose}>İptal</button>
            <button className="deleteButton" style={{ backgroundColor: "rgb(0, 190, 0)" }} onClick={handleSubmit}>Kaydet</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default createNew
