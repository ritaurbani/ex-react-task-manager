import React from 'react'
import { useContext } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import TaskRow from '../Components/TaskRow'

const TaskList = () => {

    const { tasks } = useContext(GlobalContext)
    console.log(tasks)

    return (
        <div>
            <table>
                {/* ci dovra essere almeno una riga (tr) */}
                {/* th rappresenta il nome della proprieta mostrata e intestazione nostra colonna */}
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Data di creazione</th>

                    </tr>
                </thead>
                <tbody>
                    {tasks.map((curTask) => (
                        <TaskRow key={curTask.id} task={curTask} />
                    ))}

                </tbody>
            </table>
        </div>
    )
}

export default TaskList