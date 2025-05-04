import React from 'react'
import {createPortal} from 'react-dom'

function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = "Conferma"
}) {

    // if(!show) return null


    return show && createPortal(//passiamo il componente(div), e dove vogliamo creare(document.body)
        //overlay che copre tutto in position fixed
        <div className='modal-container'>
            {/* //effetivamente la nostra modale centrata nell overlay*/}
            <div className='modal'>
                <h2>{title}</h2>
                {/* //puoi mettere content loose senza p */}
                {content}
                <div>
                    <button onClick={onClose}>Annulla</button>
                    <button onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>,
        document.body//abbiamo creato portal che passiamo al body-posizionamento modale sara al di sopra
    )
}

export default Modal