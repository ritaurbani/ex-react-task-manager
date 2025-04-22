import React from 'react'
import { useParams } from 'react-router-dom'
import { GlobalContext } from '../Context/GlobalContext'
import { useContext, useState, useEffect } from 'react'


const TaskDetail = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const {id} = useParams()
    const {tasks} = useContext(GlobalContext)

    //per no fare altra chiamata API non necessaria
    //id catturato nello useParams - Params ritorna una stringa, quindi dobbiamo fare parseInt
    const task = tasks.find(t => t.id === parseInt(id))
    //se find ritorna undefined
    if(!task){
        return (
            <h2>Task non trovato</h2>
        )
    }

    const handleDelete = () => {
        console.log("remove task", task.id)
    }

  return (
    <div>
        <p><strong>Name:</strong>{task.title} </p>
          <p><strong>Description:</strong>{task.description} </p>
          <p><strong>Status:</strong>{task.status} </p>
          <p><strong>Data di Creazione:</strong>{new Date(task.createdAt).toLocaleDateString()} </p>
        <button onClick={handleDelete}>Elimina Task</button>
    </div>
  )
}

export default TaskDetail