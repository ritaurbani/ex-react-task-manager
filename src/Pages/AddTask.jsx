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

    //Se l'utente inserisce soli spazi in un campo, 
    // il tuo primo codice lo considererebbe comunque valido:
    //if (name) controlla solo che name non sia null, 
    // undefined o "", ma non vede gli spazi come vuoti!
    const isTitleValid = () => {
        if (!title.trim()) {
            return false
        }
        console.log(title.split(""))
        const titleAsArray = title.split("")
        const doesTitleContainSymbols = titleAsArray.some((char) => symbols.includes(char))
        if (doesTitleContainSymbols) {
            return false
        }

        return true
    }

    const titleValid = isTitleValid()

    const addTask = (e) => {
        e.preventDefault()
        const description = textRef.current.value
        const status = selectRef.current.value
        const newTask = {
            title: title.trim(),
            description,
            status
        }
        console.log("New Task", newTask)
    }



    return (
        <div>
            {/* <h2>Add a task</h2> */}
            <form className="form" onSubmit={addTask}>
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
                {!titleValid && (
                    <p style={{ color: titleValid ? "green" : "red" }}>
                        "Title must not be empty and must not contain symbols"
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
                    <select ref={selectRef}>
                        <option value="To do">"status"</option>
                        <option value="To do">"To do"</option>
                        <option value="Doing">"Doing"</option>
                        <option value="Done">"Done"</option>
                    </select>
                </label>
                <button className="add-btn" type='submit'>Aggiungi Task</button>
            </form>
        </div>
    )
}

export default AddTask