import React, { useState } from 'react'
import { GlobalContext } from '../Context/GlobalContext'
import { useContext } from 'react'
import { useRef } from 'react'


//Notes:
// Cos'è isUserNameValid?
// È una variabile(non una funzione!) grazie a useMemo.
// const isUserNameValid = useMemo(() => { /* logica */ }, [username]);
// useMemo memorizza il risultato della funzione e lo assegna a isUserNameValid.
// La funzione viene ricalcolata ad ogni render(anche se username non cambia).
// Con useMemo invece, il calcolo avviene solo quando username cambia.
const AddTask = () => {

    //Note: mano a mano che scriviamo value all interno dell input react non rirenderizza pagina > console.log(rerender)
    //prima volta al mounting pagina si
    //su username ad ogni lettera rerender..
    //per email nessun rerender perche non c e usestate
    console.log("rerender")

    const { tasks, setTasks } = useContext(GlobalContext)
    const [title, setTitle] = useState('')
    const textRef = useRef() //creo un riferimento a un elem del DOM(input)
    const selectRef = useRef()
    //ref e l'elemento in se > il nostro input (input.value in js per prelevare la value di un input)
    //emailRef.current valore corrente email, ci stampa object

    const symbols = "!@#$%^&*()-_=+[]{}|;:'\\,.<>?/`~";

    const isTitleValid = () => {
        if(!title.trim()) return
    if(title.split("").some((char) => symbols.includes(char))){
    return "contiene simboli non validi"}
    return null
    }

    const 

    return (
        <form onSubmit={handleSubmit}>
            {/* Nome del task */}
            <input
                type="text"
                placeholder='title'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)} />
            {/* Ha senso mostrarlo solo se ho scritto e non e stringa vuota */}
            {title.trim() && (
                <p>
                    {isTitleValid()? "title valid": "Title must not contain symbols"}
                </p>
            )}
            {/* Description del task */}
            <textarea>
                type="text"
                name='title'
                ref = {textRef}
            </textarea>
            {/* Stato del task */}
            <select name="" id="" ref={selectRef

            }>
                <option value="">"To do"</option>
                <option value="">"Doing"</option>
                <option value="">"Done"</option>
            </select>
            <button onClick={addTask}>"Aggiungi Task</button>
        </form>
    )
}

export default AddTask