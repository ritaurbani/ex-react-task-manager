import React from 'react'

function Modal({
    title,
    content,
    show,
    onClose,
    onConfirm,
    confirmText = "Conferma"
}) {

    const [show, setShow] = useState(false)


  return (
    <div>
        <h2>{title}</h2>
        <p>{content}</p>
        <button onClose={() => setShow(false)}>{Annulla}</button>
        <button onClose={confirm}>{confirmText}</button>
    </div>
  )
}

export default Modal