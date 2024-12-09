import React from 'react'
import { Link, Links } from 'react-router-dom'
import { useAuth } from '../context/authContext';

function NavBar() {

    const { isAuthenticated, user, logout } = useAuth();

    return (
        <nav className='bg-zinc-700 flex justify-between align-center py-5 px-10 rounded-lg'>
            <Link to='/'><h1 className='text-2xl font-bold'>Task Manager</h1></Link>
            <ul className='flex gap-x-2'>
                {
                    isAuthenticated ? (
                        <>
                            <li>
                                Welcome, {user.username} |
                            </li>
                            <li>
                                <Link to='/add-task'>Add Task |</Link>
                            </li>
                            <li>
                                <button onClick={logout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to='/login'
                                className='bg-indigo-500 p-2 rounded-md'
                                >Login</Link>
                            </li>
                            <li>
                                <Link to='/register'
                                 className='bg-indigo-500 p-2 rounded-md'
                                >Register</Link>
                            </li>
                        </>
                    )
                }
            </ul>
        </nav>
    )
}

export default NavBar