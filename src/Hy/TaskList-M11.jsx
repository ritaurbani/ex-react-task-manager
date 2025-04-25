import React from 'react'
import { useContext, useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import TaskRow from '../Components/TaskRow'
import AddTask from './AddTask'

const TaskList = () => {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks)
    //rappresenta il criterio di ordinamento (title, status, createdAt).
    const [sortBy, setSortBy] = useState("createdAt")
    //rappresenta la direzione (1 per crescente, -1 per decrescente)
    const [sortOrder, setSortOrder] = useState(1)

    const sortIcon = sortOrder === 1 ? "↑" : "↓"; //crescente e 1


    const handleSorting = (colName) => {//scopo modificare stato non ritorna nulla-onClick/onChange spesso non ritoenano nulla
        if (sortBy === colName) {
            setSortOrder(prev => prev * -1) //inverte l ordine - se uso ! lo tratto come booleano ma e un numero  
        } else {//questi setter rirenderizzano componente notificando a react che lo stato e cambiato
            setSortBy(colName)//imposto nuova colonna
            setSortOrder(1)//resetto ordine a crescente
        }
    }

   const sortedTasks = useMemo(() => {// ritornare versione ordinata delle tasks
           return [...tasks].sort((a,b) => {
            let comparison;
               if(sortBy === "title") {
                 comparison =  a.title.localeCompare(b.title) 
           }  else if (
               sortBy === "status"
           ) {
                  const statusOptions = ["To do", "Doing", "Done"] //vedo dove ci troviamo > indice
                  //valori numerici sono gli indici a cui appartengono gli status nell array
                   comparison = statusOptions.indexOf(a.status) - statusOptions.indexOf(b.status)
                     } else if (
               sortBy === "createdAt"
           ) {
                   const timestampA = new Date(a.createdAt).getTime(); // Numero (es. 1672531200000)
                   const timestampB = new Date(b.createdAt).getTime();
                   comparison =  timestampA - timestampB;
           }

           return comparison * sortOrder;
   
   }) }, [tasks, sortBy, sortOrder])



    return (
        <div>
            <table className='task-table'>
                {/* ci dovra essere almeno una riga (tr) */}
                {/* th rappresenta il nome della proprieta mostrata e intestazione nostra colonna */}
                <thead>
                    <tr>
                        <th onClick={() => handleSorting("title")}>Name{sortBy === "title" && sortIcon}</th>
                        <th onClick={() => handleSorting("Status")}>Status</th>
                        <th onClick={() => handleSorting("createdAt")}>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTasks.map((curTask) => (
                        <TaskRow key={curTask.id} task={curTask} />
                    ))}


                </tbody>
            </table>
        </div>
    )
}

export default TaskList