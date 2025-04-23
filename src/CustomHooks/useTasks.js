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

    const removeTask = async (taskId) => {
      const response = await fetch(`${apiUrl}/tasks/${taskId}`, {
        method: "DELETE",
      })
      //const {success, message} = await response.json()
      const result = await response.json()
      if(!result.success){
        throw new Error(result.message)
      }//rispetto allo stato precedente prendo lo stato filtrato..
      //quello da eliminare non viene mantenuto nell array filtrato
      setTasks(prev => prev.filter((task, i) => task.id !== taskId ))
    }

    //deve prendere l id della task modificata ed effettuare il put con tutto l oggetto
    const updateTask = async(updatedTask) => {//riceve un oggetto updatedTask
      const response = await fetch(`${apiUrl}/tasks/${updatedTask.id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTask)//Convertiamo l'oggetto in JSON-passarlo cosi quando usiamo fetch
      })
      const result = await response.json()
      if(!result.success){
        throw new Error(result.message)
      }
      //per ogni task controlliamo se e uguale alla task ritornata, in quel caso 
      setTasks(prev => prev.map((t, i) => t.id ===result.task.id? result.task : t))
    }

  return {tasks, setTasks, addTask, removeTask, updateTask}
}

export default useTasks