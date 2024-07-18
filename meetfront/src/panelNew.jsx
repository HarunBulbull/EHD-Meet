// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useEffect, useState} from 'react';                              // * React
import './css/panel.css';                                                       // * CSS
import ehdlogo from './assets/ehd.png';                                         // * ehd.png
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'                // * FontAwesome Kütüphanesi
import { faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'   // * FontAwesome Kütüphanesi
import UpdateNew from './reusable/updateNew';                                   // * UpdateNew.jsx
import CreateNew from './reusable/createNew';                                   // * CreateNew.jsx
import DeleteNew from './reusable/deleteNew';                                   // * DeleteNew.jsx


// ! Ana fonksiyon
function panelNew() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [content, setContent] = useState(null);
  const [img, setImg] = useState(null);
  const [openDelete, setDelete] = useState(false);
  const [openCreate, setCreate] = useState(false);
  const [openUpdate, setUpdate] = useState(false);


  // * Tüm duyuruları çek
  const getdata = () => {
    fetch('http://localhost:8081/allNews')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
      setDelete(false);
      setCreate(false);
      setUpdate(false);
  }


  // * Uygulama açılınca getdata() fonksiyonunu çağır
  useEffect(() => {
    getdata();
  }, []);


  // * Filtre inputuna veri girilmesi
  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // * Duyuruları filtre inputuna göre filtreleme
  const filteredData = data.filter((user) => {
    return user.header.toLowerCase().includes(searchTerm);
  });


  // * Haber sil ekranı açma
  const handleOpenDelete = (id1, name1) => {
    setId(id1);
    setName(name1);
    setDelete(true);
  }


  // * Haber güncelle ekranı açma
  const handleOpenUpdate = (id1, name1, content1, img1) => {
    setId(id1);
    setName(name1);
    setContent(content1);
    setImg(img1);
    setUpdate(true);
  }

  // * Haber ekle ekranı açma
  const handleOpenCreate = () => {
    setCreate(true);
  }


  // * Ekran çıktısı
  return (
    <>
    {openCreate && <CreateNew onClose={() => getdata()} />}
    {openUpdate && <UpdateNew id={id} header={name} content={content} img={img} onClose={() => getdata()} />}
    {openDelete && <DeleteNew id={id} header={name} onClose={() => getdata()} />}
    <div className="panelFlexColumn panelMargin2">
      <img src={ehdlogo} width={"25%"} style={{minWidth: "400px", position: "relative", left: "50%", transform: "translateX(-50%)"}} />
      <h1 style={{textAlign: "center"}}><b>Haber Yönetimi</b></h1>
      <div className="panelFlex">
        <input className="userfinder" type="text" placeholder='Ara' onChange={handleChange}/>
        <button className='userplus' onClick={() => handleOpenCreate()}><FontAwesomeIcon icon={faPlus} /></button>
      </div>
      <div className="panelFlexColumn" width="100%">
      {filteredData.map((d, i) => (
        <div key={i} width="100%">
          <div className="panelUser">
            <div className="panelFlex" style={{justifyContent: "start"}}>
            <p><b>{d.id}.</b> {d.header}</p>
            <i style={{fontSize: "12px", opacity: ".7"}}>{d.date.split('T')[0]} {d.date.split('T')[1].split('.')[0]}</i>
            </div>
            <div className="panelSettings">
              <div className="userdelete" onClick={() =>handleOpenDelete(d.id, d.header)}><FontAwesomeIcon icon={faTrash} /></div>
              <div className="userupdate" onClick={() =>handleOpenUpdate(d.id, d.header, d.content, d.img)}><FontAwesomeIcon icon={faUpload} /></div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
    </>
  )
}


export default panelNew
