import React, { useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import { useContext } from 'react'
import { useRef,useMemo } from 'react'

const AddTask = () => {


    console.log("rerender")

    const { tasks, setTasks } = useContext(GlobalContext)
    const [title, setTitle] = useState('')
    const textRef = useRef() //creo un riferimento a un elem del DOM(input)
    const selectRef = useRef()

    //SENZA USEMEMO
    //creiamo stato errore
    const [errorMessage, setErrorMessage] = useState("")
    //creiamo useEffect per controllare se c e errore o no, al cambio del title
    //manipolare lo stato errore

    //CON USEMEMO
    //evitiamo di creare stato aggiuntivo e useEffect
    //taskNameError e`il risultato di un useMemo
    const isTitleValid = useMemo(() => {
        if (!title.trim()) {
            return "Nome task non puo essere vuoto"
        }
        //spread stringa nell array
        if ([...title].some((char) => symbols.includes(char))){
            return "il nome della task non puo contenere simboli"
        }
        return "" //questo e un falsy
    }, [title] )


    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";



    const titleValid = isTitleValid()

    const handleSubmit = (e) => {
        e.preventDefault()
        const description = textRef.current.value
        const status = selectRef.current.value
        const newTask = {
            title,
            description,
            status
        }
    }



    return (
        <div>
            <h2>Add a task</h2>
            <form className="form" onSubmit={handleSubmit}>
                {/* Nome del task */}
                <label >
                    Task name
                    <input
                        type="text"
                        placeholder='title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)} />
                </label>
                {/* Ha senso mostrarlo solo se ho scritto e non e stringa vuota */}
                {isTitleValid && (
                    <p style={{ color: "red" }}>
                        {isTitleValid}
                    </p>
                )}
                {/* Description del task */}
                <label htmlFor="">
                    Task description
                    <textarea
                        type="text"
                        placeholder='description'
                        name='description'
                        ref={textRef}>
                    </textarea>
                </label>
                {/* Stato del task */}
                <label>
                    Status:
                    <select ref={selectRef} defaultValue="To do">
                        {["To do", "Doing", "Done"].map((value, index) => (
                            <option key={index} value={value}>{value}</option>
                        ))}
                    </select>
                </label>
                <button className="add-btn" type='submit' disabled={!isTitleValid}>
                    Aggiungi Task
                </button>
            </form>
        </div>
    )
}

export default AddTask