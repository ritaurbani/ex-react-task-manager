import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import TaskList from './Pages/TaskList'
import AddTask from './Pages/AddTask'
import { AppLayout } from './LayOut/AppLayout'
import { GlobalProvider } from './Context/GlobalContext'
import TaskDetail from './Pages/TaskDetail'


function App() {

 
  
  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path='/' element={<TaskList />} />
              <Route path='/addtask' element={<AddTask />} />
              <Route path='/task/:id' element={<TaskDetail />} />

            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
