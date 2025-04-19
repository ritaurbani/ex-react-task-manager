import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {

    const navLinks = [
        {
            path: "/tasklist",
            title: "TaskList"
        },
        {
            path: "/tasklist/create",
            title: "AddTask"
        }
    ]


  return (
    <div>
        <nav className='navBar'>
            <h3>Task Manager</h3>
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
    </div>
  )
}

export default Navbar