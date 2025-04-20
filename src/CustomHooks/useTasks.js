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

    const addTask = (newTask) => {

    }

    const removeTask = (taskid) => {

    }
    const updateTask = (updatedtask) => {

    }

  return {tasks, setTasks, addTask, removeTask, updateTask}
}

export default useTasks