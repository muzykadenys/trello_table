import React from 'react'
import { IonIcon } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import '../Popup/popup.scss'

function Popup({ setIsVisible, children, ...rest }) {
  const closeOnBackground = (e) => {
    if (e.target == e.currentTarget) {
      setIsVisible(false)
    }
  }
  return (
    <>
      <div onClick={closeOnBackground} className="Popup_Section">
        <div className="Popup_Section_Content">
          <div
            className="Popup_Section_Content_Close"
            onClick={() => setIsVisible(false)}
          >
            <IonIcon className="popup_icon" icon={closeOutline} />
          </div>

          <div className="Popup_Section_Content_Main">
            {React.cloneElement(children, { setIsVisible, ...rest })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Popup
