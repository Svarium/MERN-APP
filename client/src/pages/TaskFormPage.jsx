import React from 'react'
import {useForm} from 'react-hook-form';
import { useTasks } from '../context/TaskContext';

function TaskFormPage() {

 const {register, handleSubmit} = useForm();
 const {tasks, createTask} = useTasks();

 const onSubmit = handleSubmit((data) => {
  createTask(data);  
 })

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>

      <form onSubmit={onSubmit}>
        <input  type="text" placeholder='Title'
        {...register('title')}
        autoFocus
        className='w-full bg-zinc-700 tex-white px-4 py-2 rounded-md my-2'
        />
        <textarea rows="3" placeholder='description'
        {...register('description')}
        className='w-full bg-zinc-700 tex-white px-4 py-2 rounded-md my-2'
        >          
        </textarea>
        <button>Save</button>
      </form>

    </div>
  )
}

export default TaskFormPage