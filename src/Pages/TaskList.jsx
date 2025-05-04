import React from 'react'
import { useContext, useState, useMemo, useCallback } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import TaskRow from '../Components/TaskRow'
import AddTask from './AddTask'

function debounce(callback, delay){
    let timer;
    return(value) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(value)
        }, delay)
    }
}


const TaskList = () => {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks)


    //rappresenta il criterio di ordinamento (title, status, createdAt).
    const [sortBy, setSortBy] = useState("createdAt")
    //rappresenta la direzione (1 per crescente, -1 per decrescente)
    const [sortOrder, setSortOrder] = useState(1)
    const [searchQuery, setSearchQuery] = useState("")


    const handleSorting = (colName) => {
        if (sortBy === colName){
       setSortOrder(-sortOrder) 
    }else{
        setSortBy(colName)//nuova colonna
           setSortOrder(1)
        }
    }


    const filteredAndSortedTasks = useMemo(() => {
        const filtered = tasks.filter(task =>
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) 
            || task.status.toLowerCase().includes(searchQuery.toLowerCase()) 
            || task.createdAt.toLocaleString().includes(searchQuery)
        );
        return [...filtered].sort((a, b) => {
            if (sortBy === "title") {
                return a.title.localeCompare(b.title) * sortOrder;
            }else if (sortBy === "status")  {
                const statusElems = ["To do", "Doing", "Done"]
                return (statusElems.indexOf(a.status) - statusElems.indexOf(b.status))*sortOrder
            }else if (sortBy === "createdAt"){
                const timeA = new Date(a.createdAt).getTime()
                const timeB = new Date(b.createdAt).getTime()
                return (timeA - timeB)*sortOrder
            };
        });
    }, [tasks, searchQuery, sortBy, sortOrder]); 
    
    //const debounceSearch = debounce(setSearchQuery, 500)  non va bene perche viene ricreato ad ogni render e timer non e memorizzato
    
    const debounceSetSearchQuery = useCallback(
        debounce((value) => 
            setSearchQuery(value), 
        300),[])

    return (
        <div>
            <div>
                <input type=""
                placeholder='Search for the task'
                onChange={(e) => debounceSetSearchQuery(e.target.value)} />
            </div>
            <table className='task-table'>
                <thead>
                    <tr>
                        <th onClick={() => handleSorting("title")}>Name </th>
                        <th onClick={() => handleSorting("Status")}>Status</th>
                        <th onClick={() => handleSorting("createdAt")}>Data di creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredAndSortedTasks.map((curTask) => (
                        <TaskRow key={curTask.id} task={curTask} />
                    ))}
          

                </tbody>
            </table>
        </div>
    )
}

export default TaskList
