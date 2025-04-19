import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskList from './Pages/TaskList'
import AddTask from './Pages/AddTask'
import { AppLayout } from './LayOut/AppLayout'


function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout/>}>
            <Route path='/' element={<TaskList />} />
            <Route path='/addtask' element={<AddTask />} />

          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
