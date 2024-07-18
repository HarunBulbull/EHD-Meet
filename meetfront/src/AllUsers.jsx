// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React, { useEffect, useState } from 'react';   // * React
import './css/AllUsers.css'                           // * CSS
import axios from 'axios';                            // * Axios (Backend haberleşmesi için)


// ! Ana fonksiyon
function AllUsers() {
  const [data, setData] = useState([])
  const [searchTerm, setSearchTerm] = useState('');
  
  // * URL parametrelerini okuma
  let x = window.location.href.split('?')[1];
  let y = x.split('&')[0];
  let clientID = decodeURIComponent(y.split('=')[1]);
  y = x.split('&')[1];
  let clientRoom = y.split('=')[1];
  
  // * Backendden tüm kullanıcıları çekme
  useEffect(() => {
    fetch('http://localhost:8081/allusers')
      .then(res => res.json())
      .then(data => setData(data.filter(user => user.name != clientID)))
      .catch(err => console.log(err));
  }, []);



  // * Kullanıcı arama inputundaki değerin değişmesi 
  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // * Kullanıcıları arama inputubdaki değere göre filtreleme
  const filteredData = data.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm);
  });



  // * Davet etme fonksiyonu
  const handleInvite = (receiverID) => {
    axios.post('http://localhost:8081/inviteuser', {
      sender: clientID,
      receiver: receiverID,
      roomid: clientRoom
    })
      .then(response => {
        if (response.data.success) {
            document.getElementById("button"+receiverID).style.backgroundColor = "green";
            document.getElementById("button"+receiverID).innerHTML = "Davet edildi";
            document.getElementById("button"+receiverID).disabled = true;
        } else {
          alert("Davet gönderilirken bir hata oluştu!");
        }
      })
      .catch(error => {
        console.error(error);
        alert("Davet gönderilirken bir hata oluştu!");
      });
  }


  // * Ekran Çıktısı
  return (
    <div className="allusersContainer">
      <input className="allusersfind" type="text" placeholder='Ara' onChange={handleChange}/>
      <div className="userlist">
      {filteredData.map((d, i) => (
        <div key={i}>
          {d.id != clientID && (
          <div className='user'>
            <i>{d.name}</i>
            <button id={"button" + d.id} onClick={() => handleInvite(d.id)}>Davet et</button>
          </div>
          )}
        </div>
        ))}
      </div>
    </div>
  )
}

export default AllUsers
