import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    const navLinks = [
        {
            path: "/",
            title: "TaskList"
        },
        {
            path: "/addtask",
            title: "AddTask"
        }
    ]


  return (
    <div>
        <nav className='navBar'>
            <ul>
                {
                    navLinks.map((curLink, index) => (
                        <li key={index}>
                            <NavLink to={curLink.path}>{curLink.title}</NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
          {/* <h3>Task Manager</h3> */}
    </div>
  )
}

export default Navbar