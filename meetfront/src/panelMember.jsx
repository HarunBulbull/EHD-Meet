// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useEffect, useState } from 'react';                               // * React
import './css/panel.css';                                                         // * CSS
import ehdlogo from './assets/ehd.png';                                           // * Ehd.png
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'                  // * FontAwesome Kütüphanesi
import { faPlus, faTrash, faUpload } from '@fortawesome/free-solid-svg-icons'     // * FontAwesone Kütüphanesi
import DeleteUser from './reusable/deleteUser';                                   // * Deleteuser.jsx
import CreateUser from './reusable/createUser';                                   // * Createuser.jsx
import UpdateUser from './reusable/updateUser';                                   // * Updateuser.jsx


// ! Ana fonksiyon
function panelMember() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [mail, setMail] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [password, setPassword] = useState(null);
  const [openDelete, setDelete] = useState(false);
  const [openCreate, setCreate] = useState(false);
  const [openUpdate, setUpdate] = useState(false);


  // * Tüm kullanıcıları çek
  const getdata = () => {
    fetch('http://localhost:8081/allusers')
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => console.log(err));
      setDelete(false);
      setCreate(false);
      setUpdate(false);
  }

  // * Uygulama çalışınca getdata() fonksiyonunu çalıştır
  useEffect(() => {
    getdata();
  }, []);


  // * Filtre inptuna veri girişi
  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };


  // * Tüm kullanıcıları filtre inputuna göre filtrele
  const filteredData = data.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm);
  });


  // * Üye sil ekranı aç
  const handleOpenDelete = (id1, name1, mail1, admin1) => {
    setId(id1);
    setName(name1);
    setMail(mail1);
    setAdmin(admin1);
    setDelete(true);
  }


  // * Üye güncelle ekranı aç
  const handleOpenUpdate = (id1, name1, mail1, password1, admin1) => {
    setId(id1);
    setName(name1);
    setMail(mail1);
    setPassword(password1);
    setAdmin(admin1);
    setUpdate(true);
  }


  // * Üye ekle ekranı aç
  const handleOpenCreate = () => {
    setCreate(true);
  }


  // * Ekran çıktısı
  return (
    <>
    {openCreate && <CreateUser onClose={() => getdata()} />}
    {openUpdate && <UpdateUser id={id} name={name} mail={mail} password={password} admin={admin} onClose={() => getdata()} />}
    {openDelete && <DeleteUser id={id} name={name} mail={mail} admin={admin} onClose={() => getdata()} />}
    <div className="panelFlexColumn panelMargin2">
      <img src={ehdlogo} width={"25%"} style={{minWidth: "400px", position: "relative", left: "50%", transform: "translateX(-50%)"}} />
      <h1 style={{textAlign: "center"}}><b>Üye Yönetimi</b></h1>
      <div className="panelFlex">
        <input className="userfinder" type="text" placeholder='Ara' onChange={handleChange}/>
        <button className='userplus' onClick={() => handleOpenCreate()}><FontAwesomeIcon icon={faPlus} /></button>
      </div>
      <div className="panelFlexColumn" width="100%">
      {filteredData.map((d, i) => (
        <div key={i} width="100%">
          <div className="panelUser">
            <details className='panelUserDetail'>
              <summary>{d.id}. {d.name}</summary>
              <div className="panelFlexColumn" style={{alignItems: "start", gap: "0", marginLeft: "1rem"}}>
                <i>E-Posta: {d.mail}</i>
                <i>Şifre: {d.password}</i>
                <i>Admin (0/1): {d.isAdmin}</i>
              </div>
            </details>
            <div className="panelSettings">
              <div className="userdelete" onClick={() =>handleOpenDelete(d.id, d.name, d.mail, d.isAdmin)}><FontAwesomeIcon icon={faTrash} /></div>
              <div className="userupdate" onClick={() =>handleOpenUpdate(d.id, d.name, d.mail, d.password, d.isAdmin)}><FontAwesomeIcon icon={faUpload} /></div>
            </div>
          </div>
        </div>
        ))}
      </div>
    </div>
    </>
  )
}


export default panelMember
