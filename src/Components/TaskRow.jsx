import React from 'react'
import { memo } from 'react';//wrappo tutta funzione


const TaskRow = memo(({ task }) => { //riga non si ricrea se task all interno non si modifica
    return (
        
            <tr>
                <td>{task.title}</td>
                <td style={{backgroundColor: 
                    task.status === "To do"? "red"
                    : task.status === "Doing" ? "yellow"
                    : task.status === "Done" ? "green": "grey" }}>{task.status}</td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
            </tr>
        
    )
})

export default TaskRow