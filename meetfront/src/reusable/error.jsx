// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React from 'react';                                          // * React
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    // * FontAwesome Kütüphanesi
import { faExclamation } from '@fortawesome/free-solid-svg-icons'   // * FontAwesome Kütüphanesi
import '../css/error.css'                                           // * CSS


// ! Ana fonksiyon
function Error({header, content}) {
  return (
    <div className="errorbox">
      <FontAwesomeIcon icon={faExclamation} className='errorboxIcon'/>
      <div className="boxContent">
        <h2>{header}</h2>
        <i>{content}</i>
      </div>
    </div>
  )
}

export default Error
