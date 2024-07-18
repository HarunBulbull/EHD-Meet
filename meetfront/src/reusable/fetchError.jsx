// * Coded by HarunBulbull
// ! Kullanılacak kütüphaneler:

import React from 'react';                                          // * React
import '../css/panelReusable.css'                                   // * CSS
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'    // * FontAwesome Kütüphanesi
import { faExclamation } from '@fortawesome/free-solid-svg-icons'   // * FontAwesome Kütüphanesi


// ! Ana fonksiyon
function fetchError({ text }) {
  return (
    <>
      <FontAwesomeIcon icon={faExclamation}  className='panelExclamation'/>
      <p className='exclamationText'>{text}</p>
    </>
  )
}

export default fetchError
