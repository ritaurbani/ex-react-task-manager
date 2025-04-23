import React, { useState, useRef } from 'react'
import Modal from './Modal'

const EditTaskModal = ({ show, onClose, task, onSave }) => {

    const formRef = useRef()//riferimento al form

    const [updatedTask, setUpdatedTask] = useState(task)

    const { title, description, status } = updatedTask;

//key: Il campo da modificare(title, description, status)
//event.target.value: Il nuovo valore
//Crea un nuovo oggetto mantenendo tutte le proprietà tranne quella modificata
    const changeUpdatedTask = (key, event) => {
        //modifichiamo updatedTask => mantenendo tutte le sue proprieta tranne quella con key title oppure key description....
        //key(title, description..) verranno modificate in e.target.value passato
        setUpdatedTask(prev => ({ ...prev, [key]: event.target.value }))
    }

    const handleSubmit = e => {
        e.preventDefault();
        onSave(updatedTask)
    }

    return (
        <div>
            <Modal
                title="Modifica Task"
                content={
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <label>
                            Task:
                            <input
                                type='text'
                                value={title}
                                //title e la key che vogliamo cambiare dentro updatedTask
                                onChange={(e) => changeUpdatedTask("title", e)}
                            />
                        </label>
                        <label>
                            Description:
                            <textarea
                                type='text'
                                value={description}
                                //title e la key che vogliamo cambiare dentro updatedTask
                                onChange={(e) => changeUpdatedTask("description", e)}
                            ></textarea>
                        </label>
                        <label>
                            Status:
                            <select
                                type='text'
                                value={status}
                                //title e la key che vogliamo cambiare dentro updatedTask
                                onChange={(e) => changeUpdatedTask("status", e)}
                            >
                                <option value="To do">"status"</option>
                                <option value="To do">"To do"</option>
                                <option value="Doing">"Doing"</option>
                                <option value="Done">"Done"</option>
                            </select>
                        </label>
                    </form>
                }
                confirmText="Salva"
                show={show}
                onClose={onClose}
                //qui dentro dobbiamo prendere form e fare un submit senza avere al suo interno un bottone
                //con il metodo scateno il suo event obbligo form ad andare in submit
                //ecco che parte la funzione handleSubmit
                //onConfirm: Simula il submit del form quando si clicca "Salva"
                onConfirm={() => formRef.current.requestSubmit()} />
        </div>
    )
}

export default EditTaskModal


//non voglio avere un form con un bottone perche modal ha gia i bottoni annulla e conferma
// Per attivare il submit del form, dobbiamo andare nel form => dobbiamo ottenere un riferimento diretto al form
// all'interno del componente. Creiamo una ref con useRef() e associamola al form.
// quando clicco sul bottone conferma della modale
// Questo ci permette di chiamare il metodo editFormRef.current.requestSubmit() che tutti gli elementi del form hanno in js
//cosi stimuliamo manualmente un submit del form
// quando l'utente clicca su "Salva" nella modale, simulando il comportamento di un normale submit.
//cliccando su Salva simuliamo comportamento di un submit senza aver messo nella modale alcun bottone