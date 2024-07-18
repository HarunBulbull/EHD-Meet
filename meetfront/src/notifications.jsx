// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useEffect, useState } from 'react';   // * React
import './css/notification.css'                       // * CSS
import { useNavigate } from 'react-router-dom';       // * Router


// ! Ana fonksiyon
function Notifications({id, name}) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const clientID = id;
  const clientName = name;


  // * Kullanıcıya ait bildirimleri çekme
  useEffect(() => {
    fetch('http://localhost:8081/allNotifications')
      .then(res => res.json())
      .then(data => setData(data.filter(notification => notification.receiverid === clientID)))
      .catch(err => console.log(err));
  }, []);


  // * Katıl Butonu
  const handleOpenRoom = ({id}) => {
    navigate('/Gorusme', { state: { room: id, name: clientName, id: clientID } });
  }


  // * Ekran Çıktısı
  return (
    <div className="allnotContainer">
      <h1 style={{textAlign: "center", fontWeight: "bold", fontSize: "20px", borderBottom: "2px solid white", color: "white"}}>BİLDİRİMLER</h1>
      <div className="notlist">
      {data.map((d, i) => (
        <div key={i}>
          <div className='not'>
            <div className="notarea">
              <i><b>{d.sendername}</b>, sizi <b>"{d.roomid}"</b> numaralı sohbete davet ediyor.</i>
              <i className='datetimearea'>{d.date.split('T')[0] + " " + d.date.split('T')[1].split('.')[0]}</i>
            </div>
            <button onClick={() => handleOpenRoom({ id: d.roomid })}>Katıl</button>
          </div>
        </div>
        ))}
      </div>
    </div>
  )
}


export default Notifications
