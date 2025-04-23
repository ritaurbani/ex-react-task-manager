import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { GlobalContext } from '../Context/GlobalContext'
import { useContext, useState, useEffect } from 'react'
import Modal from '../Components/Modal'



const TaskDetail = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const {id} = useParams()
    const {tasks, removeTask} = useContext(GlobalContext)
    const  navigate  = useNavigate()

    //MODAL
    const [show, setShow] = useState(false)


    //per no fare altra chiamata API non necessaria
    //id catturato nello useParams - Params ritorna una stringa, quindi dobbiamo fare parseInt
    const task = tasks.find(t => t.id === parseInt(id))
    //se find ritorna undefined ritorna subito html e interrompi
    if(!task){
        return (
            <h2>Task non trovato</h2>
        )
    }

    //questa e asincrona perche removeTask e asincrona
    const handleDelete = async(id) => {
        try{//await perche removeTask e`un operazione asincrona 
            await removeTask(task.id)
            setShow(true)
            alert("Task has been successfully eliminated")
            navigate("/")
        }catch(error){
            console.error(error)
            alert(error.message)
        }
    }

    //se arriva qui task esiste e procede con il render normale
  return (
    <div>
        <p><strong>Name:</strong>{task.title} </p>
          <p><strong>Description:</strong>{task.description} </p>
          <p><strong>Status:</strong>{task.status} </p>
          <p><strong>Data di Creazione:</strong>{new Date(task.createdAt).toLocaleDateString()} </p>
        <button onClick={() => setShow(true)}>Elimina Task</button>
        <Modal
            title = {task.title}
            content="New Task successfully added" //{<p>Sei sicuro che vuoi eliminare il task?</p>}
            show={show}
            onClose = {() => setShow(false)}
            onConfirm={handleDelete}
            confirmText='Conferma Elimina'
        />
    </div>
  )
}

export default TaskDetail

// Quando l’utente clicca su "Elimina Task", deve aprirsi la modale di conferma.
// Se l’utente conferma, vengono eseguite le stesse operazioni della Milestone 8.