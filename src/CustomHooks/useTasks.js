import React from 'react'
import { useEffect, useState } from 'react'

const useTasks = () => {

const apiUrl = import.meta.env.VITE_API_URL;
  
const [tasks, setTasks] = useState([])

  const getTasks = () => {//metodo get
    fetch(`${apiUrl}/tasks`)
      .then(res => res.json()) //al cui resolve voglio prendere data
      .then(data => setTasks(data))//salvare i data nello stato
      .catch(error => console.error(error))
  }

  useEffect(() => {
    getTasks()
  }, [])


    const addTask = async (newTask) => {
      //response sara uguale all await, al valore che ritorna quando va in resolve fetch di..
      //passiamo oggetto di configurazione
      const response = await fetch(`${apiUrl}/tasks`, {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newTask)//Convertiamo l'oggetto in JSON-passarlo cosi quando usiamo fetch
      })
      //CON DESTRUTTURAZIONE
      //const { success, message, task } = await response.json()
      //if (!success) {
      // throw new Error(message)
      //}
      //riceviamo response alla cui faremo un await di response.json() 
      //che ci ritorna il data risolto transformato in oggetto js leggibile
      //result e il nostro oggetto ritornato da BE con proprieta success per indicare operazione riuscito o meno
      const result = await response.json();//da testo json a obj
      if (!result.success) {
      throw new Error(result.message); //throw interrompe funzione - Lanciamo l'errore con il messaggio
      }
     //se tutto a buon fine, prendi tutte task gia salvate e aggiungiamo nuova task
     setTasks(prev => [...prev, result.task])
    }

    const removeTask = (taskid) => {

    }
    const updateTask = (updatedtask) => {

    }

  return {tasks, setTasks, addTask, removeTask, updateTask}
}

export default useTasks