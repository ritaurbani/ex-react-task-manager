import React from 'react'
import { memo } from 'react';//wrappo tutta funzione
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom"


const TaskRow = memo(({ task }) => { //riga non si ricrea se task all interno non si modifica
    
    const navigate = useNavigate()
    
    return (
        
            <tr>
                {/* //acceddo al task id che passo sopra */}
                <td> <Link to={`/task/${task.id}`}>{task.title}</Link> </td>
                <td style={{backgroundColor: 
                    task.status === "To do"? "red"
                    : task.status === "Doing" ? "yellow"
                    : task.status === "Done" ? "green": "grey" }}>{task.status}</td>
                <td>{new Date(task.createdAt).toLocaleDateString()}</td>
            </tr>
        
    )
})

export default TaskRow