import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTasks } from '../context/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createTask, getTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue('title', task.title);
        setValue('description', task.description);
        setValue('dueDate', dayjs.utc(task.dueDate).format('YYYY-MM-DD'));
      }
    }
    loadTask();
  }, [params.id, getTask, setValue]);

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateTask(params.id, {
        ...data,
        date: dayjs.utc(data.dueDate).format(),
      });
    } else {
      createTask({
        ...data,
        date: dayjs.utc(data.dueDate).format(),
      });
    }
    navigate('/tasks');
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            {...register('title', { required: 'Title is required' })}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.title && <p className="text-red-500">{errors.title.message}</p>}

          <label htmlFor="description">Description</label>
          <textarea
            rows="3"
            placeholder="Description"
            {...register('description', { required: 'Description is required' })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          {errors.description && <p className="text-red-500">{errors.description.message}</p>}

          <label htmlFor="dueDate">Date</label>
          <input
            type="date"
            {...register('dueDate', { required: 'Due date is required' })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.dueDate && <p className="text-red-500 my-2">{errors.dueDate.message}</p>}

          <button
            type="submit"
            className="bg-indigo-500 px-3 py-2 rounded-md"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TaskFormPage;
